import React, {useState} from 'react';
import {Text, SafeAreaView, View, StyleSheet, TextInput} from 'react-native';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import DoubleModal from '../../components/common/DoubleModal';
import DetailMembers from '../../components/meetingComponents/DetailMembers';
import {createMeetingProposal} from '../../lib/Alarm';
import {updateWaitingIn} from '../../lib/Meeting';
import {useToast} from '../../utils/hooks/useToast';
import useUser from '../../utils/hooks/UseUser';

function MeetingDetail({route}) {
  const userInfo = useUser();
  const loginUser = userInfo.id;
  const {
    id,
    title,
    meetingTags,
    hostId,
    region,
    peopleNum,
    meetDate,
    description,
    members,
    waiting,
  } = route.params;
  const [modalVisible_1, setModalVisible_1] = useState(false);
  const [modalVisible_2, setModalVisible_2] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const {showToast} = useToast();
  //멤버에 loginUser가 있는지 확인
  const renderByUser = () => {
    if (
      members.reduce((acc, cur) => {
        if (cur[loginUser] === 'accepted') {
          return true || acc;
        } else {
          return acc;
        }
      }, false)
    ) {
      return <Text>멤버입니다.</Text>;
    } else if (waiting && waiting.indexOf(loginUser) !== -1) {
      return <Text>미팅 수락 대기</Text>;
    } else {
      return (
        <BasicButton
          width={300}
          height={50}
          textSize={17}
          text="미팅 신청 보내기"
          onPress={() => {
            setModalVisible_1(true);
          }}
        />
      );
    }
  };
  const handleCreateProposal = () => {
    try {
      const data = {
        sender: loginUser, //로그인된 유저
        receiver: hostId,
        meetingId: id,
        message: textMessage,
      };
      createMeetingProposal(data);
      //meeting waiting 추가
      updateWaitingIn(id, loginUser); //로그인된 유저
      setModalVisible_2(!modalVisible_2);
      setTextMessage('');
      showToast(
        'success',
        '미팅 신청을 보냈습니다\n주선자의 수락을 기다려주세요!',
      );
    } catch (e) {
      setModalVisible_2(!modalVisible_2);
      setTextMessage('');
      showToast('error', '미팅 신청에 실패했습니다.\n 다시 시도해주세요');
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <BackButton />
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.meetingTags}>
          {meetingTags.map((tag, idx) => {
            return (
              <View key={idx} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.descriptionRow}>
          <Text>{description}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoEl}>{region}</Text>
          <View style={styles.bar} />
          <Text style={styles.infoEl}>{`${meetDate.slice(
            5,
            7,
          )}월 ${meetDate.slice(9, 11)}일 ${meetDate.slice(13, -6)}시`}</Text>
        </View>
        <View>
          <DetailMembers peopleNum={peopleNum} members={members} />
        </View>
        <View style={styles.buttonRow}>{renderByUser()}</View>
      </View>

      <DoubleModal
        text="미팅을 신청하시겠습니까?"
        nButtonText="아니요"
        pButtonText="신청하기"
        modalVisible={modalVisible_1}
        setModalVisible={setModalVisible_1}
        nFunction={() => setModalVisible_1(!modalVisible_1)}
        pFunction={() => {
          setModalVisible_1(false);
          setModalVisible_2(true);
        }}
      />
      <DoubleModal
        text="주선자에게 보낼 메시지를 작성해주세요"
        body={
          <View style={styles.inputBlock}>
            <TextInput
              placeholder="메시지를 작성하세요"
              multiline={true}
              style={styles.input}
              value={textMessage}
              onChangeText={setTextMessage}
            />
          </View>
        }
        nButtonText="닫기"
        pButtonText="신청 보내기"
        modalVisible={modalVisible_2}
        setModalVisible={setModalVisible_2}
        nFunction={() => setModalVisible_2(!modalVisible_2)}
        pFunction={handleCreateProposal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleRow: {
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  meetingTags: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: 'gray',
    marginHorizontal: 3,
    padding: 5,
  },
  descriptionRow: {
    marginVertical: 10,
  },
  infoRow: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoEl: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  bar: {
    backgroundColor: 'gray',
    width: 2,
    height: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  inputBlock: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    width: 220,
    height: 80,
    marginBottom: 5,
    padding: 5,
  },
});

export default MeetingDetail;

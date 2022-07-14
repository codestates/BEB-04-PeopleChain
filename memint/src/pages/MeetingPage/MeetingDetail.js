import React, {useState} from 'react';
import {Text, SafeAreaView, View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import DoubleModal from '../../components/common/DoubleModal';
import {useToast} from '../../utils/hooks/useToast';

function MeetingDetail({route}) {
  const {title, tags, host, location, people, age, date, description, members} =
    route.params;
  const [modalVisible_1, setModalVisible_1] = useState(false);
  const [modalVisible_2, setModalVisible_2] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const {showToast} = useToast();
  return (
    <SafeAreaView>
      <BackButton />
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.tags}>
          {tags.map((tag, idx) => {
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
          <Text style={styles.infoEl}>{location}</Text>
          <View style={styles.bar} />
          <Text style={styles.infoEl}>{date}</Text>
        </View>
        <View>
          <View style={styles.memberBox}>
            <View style={styles.memberBoxInfo}>
              <Text style={styles.boldFont}>현재 모인 멤버</Text>
              <View style={styles.memberBoxInfoPeoPle}>
                <Text style={styles.boldFont}>{people}</Text>
                <Text style={styles.grayFont}>{people}</Text>
              </View>
            </View>
            <View style={styles.memberList}>
              {members.map((member, idx) => (
                <View key={idx} style={styles.memberInfo}>
                  <View style={styles.memberInfoProfile}>
                    <Icon name="help" size={50} color={'gray'} />
                  </View>
                  <View style={styles.memberInfoContent}>
                    <Text style={styles.memberInfoContentEl}>
                      {member.username}
                    </Text>
                    <View style={styles.memberGenderAge}>
                      <Text style={styles.memberInfoContentEl}>
                        {member.gender}
                      </Text>
                      <Text style={styles.memberInfoContentEl}>
                        {member.age}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <BasicButton
            size="wide"
            text="미팅 신청 보내기"
            onPress={() => {
              setModalVisible_1(true);
            }}
          />
        </View>
      </View>
      <DoubleModal
        text="미팅을 신청하시겠습니까?"
        //body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="신청하기"
        modalVisible={modalVisible_1}
        setModalVisible={setModalVisible_1}
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
        pFunction={() => {
          setModalVisible_2(!modalVisible_2);
          setTextMessage('');
          showToast(
            'success',
            '미팅 신청을 보냈습니다\n주선자의 수락을 기다려주세요!',
          );
        }}
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
  tags: {
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
  memberBox: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
  },
  memberBoxInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  memberList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  memberBoxInfoPeoPle: {
    flexDirection: 'row',
  },
  memberInfo: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  memberGenderAge: {
    flexDirection: 'row',
  },
  memberInfoContentEl: {
    margin: 5,
  },
  boldFont: {
    fontWeight: 'bold',
  },
  grayFont: {
    color: 'gray',
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

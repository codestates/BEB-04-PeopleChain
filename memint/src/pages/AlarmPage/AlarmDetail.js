import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import {createMeetingAccept, updateMeetingProposal} from '../../lib/Alarm';
import {
  updateMeeting,
  updateMembersIn,
  updateWaitingOut,
} from '../../lib/Meeting';
// import {updateUserMeetingIn} from '../../lib/Users';
import {useToast} from '../../utils/hooks/useToast';
import useUser from '../../utils/hooks/UseAuth';
import { updateUserMeetingIn } from '../../lib/Users';

function AlarmDetail({route}) {
  const userInfo = useUser();
  const loginUser = userInfo.id;
  // const loginUser = '8MspyF7xz7VHDThguMAv'; //test host 계정
  // const loginUser = 'dbmtzzMFmqzshYNSOVo5' //joiner 계정
  const {id, message, meetingId, meetingInfo, sender, complete, senderInfo} =
    route.params;
  const navigation = useNavigation();
  const {showToast} = useToast();

  //수락하시겠습니까? 추가
  const handleAccept = () => {
    const data = {
      sender: loginUser, //로그인된 유저,
      receiver: sender, //(신청 메시지의 sender)
      meetingId: meetingId,
    };
    createMeetingAccept(data);
    //waiting에서 제거, member에 추가
    updateWaitingOut(meetingId, sender); //신청 메시지의 sender
    updateMembersIn(meetingId, sender); //신청 메시지의 sender
    updateMeetingProposal(id); //신청 알림 완료로 update
    updateUserMeetingIn(sender, 'joinedroomId', meetingId); //User에 room 추가하기
    if (meetingInfo.peopleNum * 2 - 1 === meetingInfo.members.length) {
      //미팅의 상태도 손수 수정해줍니다.(임시로)
      updateMeeting(meetingId, {status: 'full'});
    }
    showToast('basic', '신청이 수락되었습니다');
    navigation.navigate('AlarmPage');
  };

  // const handleDeny = () => {
  //   showToast('basic', '신청이 거절되었습니다');
  //   navigation.pop();
  // };

  return (
    <SafeAreaView style={styles.screen}>
      <BackButton />
      <View style={styles.container}>
        <View style={styles.profileArea}>
          <Image
            source={require('../ChattingPage/dummydata/images/26.png')}
            style={styles.userImage}
          />
          <View style={styles.userInfo}>
            <View style={styles.userInfoElement}>
              <Text style={styles.key}>닉네임</Text>
              <Text style={styles.value}>{senderInfo?.nickname}</Text>
            </View>
            <View style={styles.userInfoElement}>
              <Text style={styles.key}>나이</Text>
              <Text style={styles.value}>{senderInfo?.birth}</Text>
            </View>
            <View style={styles.userInfoElement}>
              <Text style={styles.key}>성별</Text>
              <Text style={styles.value}>{senderInfo?.gender}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.key}>메시지</Text>
        <Text style={styles.message}>{message}</Text>
        <View>
          <Text style={styles.key}>미팅 정보</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MeetingDetail', {
                id,
                title: meetingInfo.title,
                meetingTags: meetingInfo.meetingTags,
                hostId: meetingInfo.hostId,
                region: meetingInfo.region,
                peopleNum: meetingInfo.peopleNum,
                meetDate: meetingInfo.meetDate,
                description: meetingInfo.description,
                members: meetingInfo.members,
                waiting: meetingInfo.waiting,
                hostInfo: meetingInfo.hostInfo,
              })
            }>
            <Text style={styles.meetingTitle}>{meetingInfo.title}</Text>
            <View style={styles.meetingInfo}>
              <Text style={styles.meetingElement}>{meetingInfo.region}</Text>
              <View style={styles.bar} />
              <Text style={styles.meetingElement}>{meetingInfo.meetDate}</Text>
              <View style={styles.bar} />
              <Text style={styles.meetingElement}>
                {meetingInfo.peopleNum + ':' + meetingInfo.peopleNum}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {complete ? (
          <Text style={styles.acceptText}>신청을 수락했습니다</Text>
        ) : (
          <>
            <Text style={styles.acceptText}>신청을 수락하시겠습니까?</Text>
            <View style={styles.buttonArea}>
              {/* <BasicButton
                text="거절하기"
                width={120}
                height={50}
                textSize={17}
                margin={[5, 20, 5, 20]}
                backgroundColor="gray"
                onPress={handleDeny}
              /> */}
              <BasicButton
                text="수락하기"
                width={120}
                height={50}
                textSize={17}
                margin={[5, 20, 5, 20]}
                onPress={handleAccept}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginVertical: 10,
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'center',
  },
  profileArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  userImage: {
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  acceptText: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 40,
  },
  userInfo: {
    marginLeft: 30,
  },
  userInfoElement: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  meetingInfo: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 10,
  },
  bar: {
    width: 1,
    backgroundColor: 'gray',
    marginVertical: 1,
    marginHorizontal: 5,
  },
  key: {
    color: 'gray',
    width: 80,
  },
  value: {
    width: 80,
    justifyContent: 'flex-end',
    fontSize: 18,
  },
  message: {
    marginTop: 10,
    marginBottom: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  meetingTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AlarmDetail;

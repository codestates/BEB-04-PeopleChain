import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, Image} from 'react-native';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import {useToast} from '../../utils/hooks/useToast';

function AlarmDetail() {
  const {showToast} = useToast();
  const handleAccept = () => {
    showToast('basic', '신청이 수락되었습니다');
  };
  const handleDeny = () => {
    showToast('basic', '신청이 거절되었습니다');
  };
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
              <Text style={styles.value}>username</Text>
            </View>
            <View style={styles.userInfoElement}>
              <Text style={styles.key}>나이</Text>
              <Text style={styles.value}>age</Text>
            </View>
            <View style={styles.userInfoElement}>
              <Text style={styles.key}>성별</Text>
              <Text style={styles.value}>username</Text>
            </View>
          </View>
        </View>
        <Text style={styles.key}>메시지</Text>
        <Text style={styles.message}>message</Text>
        <View>
          <Text style={styles.key}>미팅 정보</Text>
          <Text style={styles.meetingTitle}>title</Text>
          <View style={styles.meetingInfo}>
            <Text style={styles.meetingElement}>지역</Text>
            <View style={styles.bar} />
            <Text style={styles.meetingElement}>날짜</Text>
            <View style={styles.bar} />
            <Text style={styles.meetingElement}>인원</Text>
            <View style={styles.bar} />
            <Text style={styles.meetingElement}>나이</Text>
          </View>
        </View>
        <Text style={styles.acceptText}>신청을 수락하시겠습니까?</Text>
        <View style={styles.buttonArea}>
          <BasicButton
            text="거절하기"
            width={120}
            height={50}
            textSize={17}
            margin={[5, 20, 5, 20]}
            backgroundColor="gray"
            onPress={handleDeny}
          />
          <BasicButton
            text="수락하기"
            width={120}
            height={50}
            textSize={17}
            margin={[5, 20, 5, 20]}
            onPress={handleAccept}
          />
        </View>
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
  },
  meetingTitle: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default AlarmDetail;

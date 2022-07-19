import React, {useState} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import AlarmElement from '../../components/alarmComponents/AlarmElement';
import DoubleModal from '../../components/common/DoubleModal';
function AlarmPage({navigation}) {
  const [chattingConfirmModal, setChattingConfirmModal] = useState(false);
  const alarmData = [
    {
      message: 'Username님이 신청을 수락했습니다',
      type: 'accept',
      meetingData: {
        title: '금요일 밤 재미있게 노실 분들 구해요',
        region: '강남',
        people: '2:2',
        age: '30초',
        date: '7월 8일 (금)',
      },
      created_at: '3분 전',
    },
    {
      message: '아현동 불주먹 님의 신청이 도착했습니다',
      type: 'proposal',
      meetingData: {
        title: '금요일 밤 재미있게 노실 분들 구해요',
        region: '강남',
        people: '2:2',
        age: '30초',
        date: '7월 8일 (금)',
      },
      created_at: '3분 전',
    },
  ];
  return (
    <SafeAreaView>
      <Text style={styles.title}>알림</Text>
      <View>
        {alarmData.map((alarm, idx) => (
          <AlarmElement
            key={idx}
            message={alarm.message}
            meetingData={alarm.meetingData}
            created_at={alarm.created_at}
            type={alarm.type}
            onPress={
              alarm.type === 'proposal'
                ? () => navigation.navigate('AlarmDetail')
                : () => setChattingConfirmModal(true)
            }
          />
        ))}
      </View>
      <DoubleModal
        text="채팅창으로 이동하시겠습니까?"
        //body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="네"
        modalVisible={chattingConfirmModal}
        setModalVisible={setChattingConfirmModal}
        pFunction={() => {}}
        nFunction={() => {
          setChattingConfirmModal(!chattingConfirmModal);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 60,
    marginLeft: 20,
  },
});

export default AlarmPage;

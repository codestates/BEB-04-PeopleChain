import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import AlarmElement from '../../components/alarmComponents/AlarmElement';
import DoubleModal from '../../components/common/DoubleModal';
import {getAlarmsById} from '../../lib/Alarm';
import {getMeeting} from '../../lib/Meeting';
import {handleDate} from '../../utils/common/Functions';
import useUser from '../../utils/hooks/UseUser';

function AlarmPage({navigation}) {
  const userInfo = useUser();
  const loginUser = userInfo.id;
  // const loginUser = '8MspyF7xz7VHDThguMAv'; //test host 계정
  // const loginUser = 'dbmtzzMFmqzshYNSOVo5' //joiner 계정
  const [chattingConfirmModal, setChattingConfirmModal] = useState(false);
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    getAlarmPage();
  }, [getAlarmPage]);

  const getAlarmPage = useCallback(async () => {
    const res = await getAlarmsById(loginUser);
    const data = res.docs.map(el => {
      return {
        ...el.data(),
        id: el.id,
        createdAt: handleDate(el.data().createdAt),
      };
    });

    const dataWithMeetingInfo = await Promise.all(
      data.map(async el => {
        const meet = await getMeeting(el.meetingId);
        return {
          ...el,
          meetingInfo: {
            ...meet.data(),
            meetDate: handleDate(meet.data().meetDate),
          },
        };
      }),
    );
    setAlarms(dataWithMeetingInfo);
  }, [loginUser]);

  return (
    <SafeAreaView>
      <Text style={styles.title}>알림</Text>
      <View>
        {alarms.map((alarm, idx) => (
          <AlarmElement
            key={idx}
            message={alarm.message}
            meetingId={alarm.meetingId}
            createdAt={alarm.createdAt}
            meetingInfo={alarm.meetingInfo}
            type={alarm.type}
            sender={alarm.sender}
            onPress={
              alarm.type === 'proposal'
                ? () =>
                    navigation.navigate('AlarmDetail', {
                      id: alarm.id,
                      message: alarm.message,
                      meetingId: alarm.meetingId,
                      meetingInfo: alarm.meetingInfo,
                      sender: alarm.sender,
                      complete: alarm.complete,
                    })
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

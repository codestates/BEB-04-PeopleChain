import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import AlarmElement from '../../components/alarmComponents/AlarmElement';
import DoubleModal from '../../components/common/DoubleModal';
import {getAlarmsById} from '../../lib/Alarm';
import {getMeeting} from '../../lib/Meeting';
import {getUser} from '../../lib/Users';
import {
  handleDateFromNow,
  handleDateInFormat,
} from '../../utils/common/Functions';
import useUser from '../../utils/hooks/UseUser';

function AlarmPage({navigation}) {
  const userInfo = useUser();
  const loginUser = userInfo.id;
  // const loginUser = '8MspyF7xz7VHDThguMAv'; //test host 계정
  // const loginUser = 'dbmtzzMFmqzshYNSOVo5' //joiner 계정
  const [chattingConfirmModal, setChattingConfirmModal] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAlarmPage();
  }, [getAlarmPage, isFocused]);
  const getAlarmPage = useCallback(async () => {
    try {
      //알림 데이터
      const res = await getAlarmsById(loginUser);
      const data = res.docs.map(el => {
        return {
          ...el.data(),
          id: el.id,
          createdAt: handleDateFromNow(el.data().createdAt),
        };
      });
      //sender데이터
      const dataWithSenderInfo = await Promise.all(
        data.map(async el => {
          const info = await getUser(el.sender);
          return {
            ...el,
            senderInfo: info,
          };
        }),
      );
      //미팅 데이터
      const dataWithMeetingInfo = await Promise.all(
        dataWithSenderInfo.map(async el => {
          const meet = await getMeeting(el.meetingId);
          if (meet.data()) {
            return {
              ...el,
              meetingInfo: {
                ...meet.data(),
                meetDate: handleDateInFormat(meet.data().meetDate),
              },
            };
          } else {
            return {
              ...el,
            };
          }
        }),
      );
      setAlarms(dataWithMeetingInfo);
    } catch (e) {
      console.log(e);
    }
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
            senderInfo={alarm.senderInfo}
            onPress={
              alarm.type === 'proposal'
                ? () => {
                    if (alarm.meetingInfo) {
                      navigation.navigate('AlarmDetail', {
                        id: alarm.id,
                        message: alarm.message,
                        meetingId: alarm.meetingId,
                        meetingInfo: alarm.meetingInfo,
                        sender: alarm.sender,
                        senderInfo: alarm.senderInfo,
                        complete: alarm.complete,
                      });
                    }
                  }
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

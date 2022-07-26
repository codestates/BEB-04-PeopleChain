import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {handleBirth, handleDateInFormat, handleISOtoLocale} from '../../utils/common/Functions';
import DoubleModal from '../common/DoubleModal';

function AlarmElement({
  meetingInfo,
  createdAt,
  onPress,
  type,
  senderInfo,
  chattingConfirmModal,
  setChattingConfirmModal,
  handleMoveChattingRoom,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <DoubleModal
        text="채팅창으로 이동하시겠습니까?"
        //body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="네"
        modalVisible={chattingConfirmModal}
        setModalVisible={setChattingConfirmModal}
        pFunction={() => handleMoveChattingRoom(meetingInfo)}
        nFunction={() => {
          setChattingConfirmModal(!chattingConfirmModal);
        }}
      />
      <Icon name="notifications" size={30} style={styles.icon} />
      <View style={styles.content}>
        <View style={styles.messageHead}>
          <Text style={styles.message}>
            {type === 'proposal'
              ? `${senderInfo?.nickName}님의 신청이 도착했습니다!`
              : `${senderInfo?.nickName}님이 신청을 수락했습니다!`}
          </Text>
          <Text>{createdAt}</Text>
        </View>
        <View style={styles.meetingArea}>
          {meetingInfo ? (
            <>
              <Text>{meetingInfo.title}</Text>
              <View style={styles.meetingInfo}>
                <Text style={styles.meetingElement}>{meetingInfo.region}</Text>
                <View style={styles.bar} />
                <Text style={styles.meetingElement}>
                  {meetingInfo.peopleNum + ':' + meetingInfo.peopleNum}
                </Text>
                <View style={styles.bar} />
                <Text style={styles.meetingElement}>
                  {handleBirth(senderInfo.birth)}
                </Text>
                <View style={styles.bar} />
                <Text style={styles.meetingElement}>
                  {handleDateInFormat(meetingInfo.meetDate)}
                </Text>
              </View>
            </>
          ) : (
            <Text>삭제된 미팅입니다</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 100,
  },
  icon: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  messageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 35,
  },
  message: {
    fontSize: 16,
  },
  meetingArea: {
    height: 40,
  },
  meetingInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  bar: {
    width: 1,
    backgroundColor: 'gray',
    marginVertical: 1,
    marginHorizontal: 5,
  },
});

export default AlarmElement;

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function AlarmElement({meetingInfo, createdAt, onPress, type, senderInfo}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="notifications" size={30} style={styles.icon} />
      <View style={styles.content}>
        <View style={styles.messageHead}>
          <Text style={styles.message}>
            {type === 'proposal'
              ? `${senderInfo?.nickname}님의 신청이 도착했습니다!`
              : `${senderInfo?.nickname}님이 신청을 수락했습니다!`}
          </Text>
          <Text>{createdAt}</Text>
        </View>
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
              <Text style={styles.meetingElement}>{'30대'}</Text>
              <View style={styles.bar} />
              <Text style={styles.meetingElement}>{meetingInfo?.meetDate}</Text>
            </View>
          </>
        ) : (
          <Text>삭제된 미팅입니다</Text>
        )}
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
  },
  message: {
    fontSize: 16,
    marginBottom: 15,
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

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function AlarmElement({message, meetingData, created_at, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="notifications" size={30} style={styles.icon} />
      <View style={styles.content}>
        <View style={styles.messageHead}>
          <Text style={styles.message}>{message}</Text>
          <Text>{created_at}</Text>
        </View>
        <Text>{meetingData.title}</Text>
        <View style={styles.meetingInfo}>
          <Text style={styles.meetingElement}>{meetingData.region}</Text>
          <View style={styles.bar} />
          <Text style={styles.meetingElement}>{meetingData.people}</Text>
          <View style={styles.bar} />
          <Text style={styles.meetingElement}>{meetingData.age}</Text>
          <View style={styles.bar} />
          <Text style={styles.meetingElement}>{meetingData.date}</Text>
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

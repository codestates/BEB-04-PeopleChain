import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {handleBirth, handleDateInFormat} from '../../utils/common/Functions';

function MeetingElement({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('MeetingDetail', {data: item})}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.meetingTags}>
        {item.meetingTags?.map((tag, idx) => (
          <View key={idx} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.infoRow}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{item.hostInfo.nickName}</Text>
        </View>
        <View style={styles.infoList}>
          <Text style={[styles.infoEl]}>{item.region}</Text>
          <View style={styles.bar} />
          <Text style={[styles.infoEl]}>
            {item.peopleNum + ':' + item.peopleNum}
          </Text>
          <View style={styles.bar} />
          <Text style={[styles.infoEl]}>
            {handleBirth(item.hostInfo.birth)}
          </Text>
          <View style={styles.bar} />
          <Text style={[styles.infoEl]}>
            {handleDateInFormat(item.meetDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 5,
    paddingVertical: 18,
    paddingHorizontal: 30,
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 25,
  },
  meetingTags: {
    marginVertical: 5,
    flexDirection: 'row',
    height: 35,
  },
  tag: {
    backgroundColor: 'gray',
    marginHorizontal: 3,
    marginVertical: 3,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    width: 1,
    height: 12,
    marginHorizontal: 4,
    backgroundColor: 'gray',
  },
});

export default MeetingElement;

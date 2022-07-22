import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

function MeetingElement({
  id,
  title,
  meetingTags,
  hostId,
  region,
  peopleNum,
  meetDate,
  description,
  members,
  waiting,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('MeetingDetail', {
          id,
          title,
          meetingTags,
          hostId,
          region,
          peopleNum,
          meetDate,
          description,
          members,
          waiting,
        })
      }>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.meetingTags}>
        {meetingTags?.map((tag, idx) => (
          <View key={idx} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.infoRow}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{hostId}</Text>
        </View>
        <View style={styles.infoList}>
          <Text style={[styles.infoEl]}>{region}</Text>
          <View style={styles.bar} />
          <Text style={[styles.infoEl]}>{peopleNum + ':' + peopleNum}</Text>
          <View style={styles.bar} />
          <Text style={[styles.infoEl]}>{}</Text>
          <View style={styles.bar} />
          <Text style={[styles.infoEl]}>{`${meetDate.slice(
            5,
            7,
          )}월 ${meetDate.slice(9, 11)}일 ${meetDate.slice(13, -6)}시`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meetingTags: {
    marginVertical: 7,
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: 'gray',
    marginHorizontal: 3,
    padding: 5,
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

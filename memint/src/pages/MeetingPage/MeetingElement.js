import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

function MeetingElement({
  title,
  tags,
  host,
  location,
  people,
  age,
  date,
  description,
  members,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('MeetingDetail', {
          title,
          tags,
          host,
          location,
          people,
          age,
          date,
          description,
          members,
        })
      }>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.tags}>
        {tags.map(tag => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.infoRow}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{host}</Text>
        </View>
        <View style={styles.infoList}>
          <Text style={[styles.infoEl]}>{location}</Text>
          <View style={styles.bar}></View>
          <Text style={[styles.infoEl]}>{people}</Text>
          <View style={styles.bar}></View>
          <Text style={[styles.infoEl]}>{age}</Text>
          <View style={styles.bar}></View>
          <Text style={[styles.infoEl]}>{date.slice(0, 10)}</Text>
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
  tags: {
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

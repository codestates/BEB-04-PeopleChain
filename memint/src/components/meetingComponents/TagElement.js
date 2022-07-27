import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function TagElement({tag, meetingInfo, setMeetingInfo}) {
  const [colored, setColored] = useState(
    meetingInfo.meetingTags.indexOf(tag) !== -1 ? true : false,
  );
  const handleClick = () => {
    if (colored) {
      setColored(false);
      setMeetingInfo({
        ...meetingInfo,
        meetingTags: meetingInfo.meetingTags.filter(el => el !== tag),
      });
    } else {
      setColored(true);
      setMeetingInfo({
        ...meetingInfo,
        meetingTags: meetingInfo.meetingTags.concat(tag),
      });
    }
  };
  return (
    <TouchableOpacity
      style={[styles.tag, colored ? styles.coloredTag : '']}
      onPress={handleClick}>
      <Text style={styles.text}>{tag}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 10,
  },
  coloredTag: {
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
    fontWeight: '500',
  },
});

export default TagElement;

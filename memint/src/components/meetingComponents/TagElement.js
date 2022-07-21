import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function TagElement({tag, meetingInfo, setMeetingInfo}) {
  const [colored, setColored] = useState(false);
  const handleClick = () => {
    if (colored) {
      setColored(false);
      setMeetingInfo({
        ...meetingInfo,
        tags: meetingInfo.meetingTags.filter(el => el !== tag),
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
      <Text>{tag}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: 'gray',
    padding: 8,
    marginHorizontal: 8,
  },
  coloredTag: {
    backgroundColor: 'yellow',
  },
});

export default TagElement;

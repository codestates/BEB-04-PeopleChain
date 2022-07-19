import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function TagElement({tag, drinkInfo, setDrinkInfo}) {
  const [colored, setColored] = useState(false);
  const handleClick = () => {
    if (colored) {
      setColored(false);
      setDrinkInfo({
        ...drinkInfo,
        // tags: drinkInfo.tags.filter(el => el !== tag),
      });
    } else {
      setColored(true);
      setDrinkInfo({...drinkInfo});
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
    backgroundColor: 'lightgrey',
    margin: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  coloredTag: {
    backgroundColor: 'yellow',
  },
});

export default TagElement;

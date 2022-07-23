import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function TagElement({tag, drinkInfo, setDrinkInfo, type}) {
  const [colored, setColored] = useState(false);
  const handleClick = () => {
    if (colored) {
      setColored(false);
      if (type === 'alcoholType') {
        setDrinkInfo({
          ...drinkInfo,
          alcoholType: drinkInfo.alcoholType.filter(el => el !== tag),
        });
      } else if (type === 'drinkStyle') {
        setDrinkInfo({
          ...drinkInfo,
          alcoholType: drinkInfo.drinkStyle.filter(el => el !== tag),
        });
      }
    } else {
      setColored(true);
      if (type === 'alcoholType') {
        const alcoholType = [...drinkInfo.alcoholType, tag];
        setDrinkInfo({
          ...drinkInfo,
          alcoholType: alcoholType,
        });
      } else if (type === 'drinkStyle') {
        const drinkStyle = [...drinkInfo.drinkStyle, tag];
        setDrinkInfo({
          ...drinkInfo,
          drinkStyle: drinkStyle,
        });
      }
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

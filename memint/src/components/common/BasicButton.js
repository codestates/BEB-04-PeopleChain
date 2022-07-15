import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

/*

  BasicButton 사용법

  props
  text => 버튼 내용
  width =>
  height =>
  backgroundcolor =>
  margin => [top, right, bottom, left]
  //지정안하면 basic으로
  onPress => 실행 함수

  Ex)
    <BasicButton
    text="버튼"
    width={100}
    height={40}
    textSize={14}
    backgroundColor="blue"
    margin={[10, 3, 3, 3]}
    onPress={onPress}
  />

*/

function BasicButton({
  text,
  backgroundColor,
  width,
  height,
  textSize,
  margin,
  onPress,
}) {
  const [marginTop, marginRight, marginBottom, marginLeft] = margin;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.button,
          {
            width: width,
            height: height,
            backgroundColor: backgroundColor,
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
          },
        ]}>
        <Text style={[styles.buttonText, {fontSize: textSize}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

BasicButton.defaultProps = {
  width: 100,
  height: 40,
  backgroundColor: '#007aff',
  text: '버튼',
  textSize: 14,
  margin: [5, 5, 5, 5],
  onPress: () => {},
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default BasicButton;

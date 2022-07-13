import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

/*
  BasicButton 사용법

  props
  text => 버튼 내용
  size => "small", "medium", "large", "wide"
  variant => "basic", "disable"
  onPress => 실행 함수

  Ex)
  <BasicButton text="버튼" size="medium" variant="basic" onPress={click} />
*/

function BasicButton({text, variant, size, onPress}) {
  const sizeStyle = SIZE[size];
  const sizeTextStyle = TEXTSIZE[size];
  const variantStyle = VARIANT[variant];
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[styles.button, sizeStyle, variantStyle]}>
        <Text style={[styles.buttonText, sizeTextStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#007aff',
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

const TEXTSIZE = {
  small: {
    fontSize: 13,
  },
  medium: {
    fontSize: 15,
  },
  large: {
    fontSize: 17,
  },
  wide: {
    fontSize: 17,
  },
};

const SIZE = StyleSheet.create({
  small: {
    width: 70,
    height: 35,
  },
  medium: {
    width: 100,
    height: 40,
  },
  large: {
    width: 200,
    height: 40,
  },
  wide: {
    width: 300,
    height: 40,
  },
});

const VARIANT = {
  basic: styles.basic,
  disable: {
    backgroundColor: '#d5d5d6',
  },
};

export default BasicButton;

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

/*
BasicButton 사용법

props
size => "small", "medium", "large"
variant => "basic", "disable"
onPress => 실행 함수

태그 사이 => text 내용 

  <BasicButton size="medium" variant="basic" onPress={click}>
    안녕
  </BasicButton>
*/

function BasicButton({variant, size, onPress, children}) {
  const sizeStyle = SIZE[size];
  const sizeTextStyle = TEXTSIZE[size];
  const variantStyle = VARIANT[variant];
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[styles.button, sizeStyle, variantStyle]}>
        <Text style={[styles.buttonText, sizeTextStyle]}>{children}</Text>
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
    fontSize: 12,
  },
  medium: {
    fontSize: 15,
  },
  large: {
    fontSize: 17,
  },
};

const SIZE = StyleSheet.create({
  small: {
    width: 60,
    height: 30,
  },
  medium: {
    width: 100,
    height: 40,
  },
  large: {
    width: 200,
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

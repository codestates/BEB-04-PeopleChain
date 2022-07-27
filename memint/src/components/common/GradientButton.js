import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

function GradientButton({
  text,
  width,
  height,
  textSize,
  margin,
  onPress,
  borderRadius,
}) {
  const [marginTop, marginRight, marginBottom, marginLeft] = margin;

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#A7BFEB', '#FBC2EA']}
        style={[
          styles.walletButton,
          {
            width: width,
            height: height,
            marginTop: marginTop,
            marginRight: marginRight,
            marginBottom: marginBottom,
            marginLeft: marginLeft,
            borderRadius: borderRadius,
          },
        ]}>
        <Text style={[styles.buttonText, {fontSize: textSize}]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

GradientButton.defaultProps = {
  width: 70,
  height: 45,
  borderRadius: 15,
  margin: [5, 5, 5, 5],
  textColor: 'white',
  text: '버튼',
  onPress: () => {},
};

const styles = StyleSheet.create({
  walletButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GradientButton;

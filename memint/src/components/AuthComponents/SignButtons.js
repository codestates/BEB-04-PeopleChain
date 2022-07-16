import React from 'react';
import {StyleSheet, View} from 'react-native';
import BasicButton from '../common/BasicButton';

const SignButtons = ({isSignup, onSubmitSignIn, onSubmitSignUp}) => {
  return (
    <View style={styles.buttons}>
      <BasicButton
        style={styles.button}
        size="medium"
        text="로그인"
        hasMarginBottom
        onPress={onSubmitSignIn}
      />
      <BasicButton
        style={styles.button}
        size="medium"
        variant="disable"
        text="회원가입"
        onPress={onSubmitSignUp}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
    marginTop: 32,
  },
  button: {
    flex: 1,
  },
});

export default SignButtons;

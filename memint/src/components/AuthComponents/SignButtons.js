import React from 'react';
import {StyleSheet, View} from 'react-native';
import BasicButton from '../common/BasicButton';

const SignButtons = ({isSignup, onSubmitSignIn, onSubmitSignUp}) => {
  return (
    <View style={styles.buttons}>
      <BasicButton
        style={styles.button}
        width={100}
        height={40}
        textSize={15}
        margin={[5, 5, 5, 5]}
        text="로그인"
        hasMarginBottom
        onPress={onSubmitSignIn}
      />
      <BasicButton
        style={styles.button}
        size="medium"
        variant="disable"
        text="회원가입"
        width={100}
        height={40}
        textSize={15}
        margin={[5, 5, 5, 5]}
        backgroundColor="#d5d5d6"
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

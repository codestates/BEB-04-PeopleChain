import React, {useRef, useState} from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BasicButton from '../../components/common/BasicButton';
import BorderedInput from '../../components/SignInComponents/BorderedInput';
import OauthButton from '../../components/SignInComponents/OauthButton';
import SignForm from '../../components/SignInComponents/SignForm';
import SignButtons from '../../components/SignInComponents/SignButtons';

const SignInScreen = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  // const {isSignup} = route.params || {};
  const passwordRef = useRef();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>MeMint</Text>
        <View style={styles.form}>
          <SignForm
            // isSignup={isSignup}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />

          <SignButtons onSubmit={onSubmit} />
          <View style={styles.textContainer}>
            <Text style={styles.textAsk}>이미 회원이신가요?</Text>
            <Text style={styles.textFind}>아이디 / 비밀번호 찾기</Text>
          </View>
          <View style={styles.oauthbutton}>
            <OauthButton
              style={styles.oauthbutton}
              size="wide"
              text="Google 계정으로 로그인"
              hasMarginBottom
            />
            <OauthButton
              style={styles.oauthbutton}
              size="wide"
              variant="disable"
              text="Apple 계정으로 로그인"
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 52,
  },
  textAsk: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  textFind: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },

  oauthbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 64,
    // paddingHorizontal: 16,
  },
});

export default SignInScreen;

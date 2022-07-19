import React, {useRef, useState} from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BasicButton from '../../components/common/BasicButton';
import BorderedInput from '../../components/AuthComponents/BorderedInput';
import OauthButton from '../../components/AuthComponents/OauthButton';
import SignForm from '../../components/AuthComponents/SignForm';
import SignButtons from '../../components/AuthComponents/SignButtons';
import {signUp} from '../../lib/auth';

const SignInScreen = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  // const {isSignup} = route.params || {};

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const goToSignUp = () => {
    Keyboard.dismiss();
    navigation.navigate('VerifyMobile');
    console.log(form);
  };
  // const goToMain = () => {
  //   Keyboard.dismiss();
  //   navigation.navigate('Main');
  //   console.log(form);
  // };
  const goToMain = async () => {
    Keyboard.dismiss();
    try {
      const user = await signUp(form);
      console.log(user);
    } catch (error) {
      console.log(error);
    }

    navigation.navigate('Main');
  };
  const goToFindId = () => {
    navigation.navigate('FindIdVerifyMobile');
  };
  const goToFindPW = () => {
    navigation.navigate('FindPWVerify');
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
            onSubmit={goToMain}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />

          <SignButtons onSubmitSignIn={goToMain} onSubmitSignUp={goToSignUp} />
          <View style={styles.textContainer}>
            <Text style={styles.textAsk}>이미 회원이신가요?</Text>
            {/* <Text style={styles.textFind}>아이디 / 비밀번호 찾기</Text> */}
            <TouchableOpacity style={styles.textFind} onPress={goToFindId}>
              <Text> 아이디 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textFind} onPress={goToFindPW}>
              <Text> 비밀번호 찾기</Text>
            </TouchableOpacity>
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

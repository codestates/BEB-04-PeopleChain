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
import BorderedInput from '../../components/AuthComponents/BorderedInput';
import BackButton from '../../components/common/BackButton';

const FindPWVerifyScreen = ({navigation}) => {
  const [form, setForm] = useState({
    mobileNumber: '',
    verficationCode: '',
    email: '',
  });
  // const {isSignup} = route.params || {};
  const verificationCodeRef = useRef();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };
  const goToNextPage = () => {
    navigation.navigate('SetNewPW');
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <BackButton />
        <View style={styles.fullscreenSub}>
          <Text style={styles.text}>MeMint</Text>
          <Text style={styles.contentText}>
            회원가입 시 사용하신 전화번호를 입력해주세요.
          </Text>
          {/* <Text style={styles.contentTextSub}>
            안전한 미팅주선을 위해 사용됩니다
          </Text> */}
          <View style={styles.form}>
            <BorderedInput
              size="large"
              placeholder="핸드폰 번호를 입력해주세요"
              hasMarginBottom
              value={form.mobileNumber}
              onChangeText={createChangeTextHandler('mobileNumber')}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              returnKeyType={'done'}
              onSubmitEditing={() => verificationCodeRef.current.focus()}
            />
            <BasicButton
              style={styles.button}
              size="small"
              text="인증번호받기"
              hasMarginBottom
              onPress={onSubmit}
            />
          </View>
          <Text style={styles.contentTextVerify}>인증번호</Text>
          <View style={styles.secondForm} hasMarginBottom>
            <BorderedInput
              size="large"
              placeholder="인증번호를 입력해주세요"
              value={form.verificationCode}
              onChangeText={createChangeTextHandler('verficationCode')}
              secureTextEntry
              ref={verificationCodeRef}
              returnKeyType={'done'}
              onSubmitEditing={() => {
                onSubmit();
              }}
            />
            <BasicButton
              style={styles.button}
              size="small"
              text="인증"
              hasMarginBottom
              onPress={onSubmit}
            />
          </View>
          <Text style={styles.contentTextVerify}>이메일을 입력해주세요</Text>
          <View style={styles.secondForm} hasMarginBottom>
            <BorderedInput
              size="wide"
              placeholder="이메일을 입력해주세요"
              value={form.email}
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
              keyboardType="email-address"
              onChangeText={createChangeTextHandler('email')}
              returnKeyType={'done'}
              onSubmitEditing={() => {
                onSubmit();
              }}
            />
          </View>
          <BasicButton
            style={styles.button}
            size="wide"
            text="다음 단계"
            hasMarginBottom
            onPress={goToNextPage}
          />
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
  },
  fullscreenSub: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 18,
    marginTop: 64,
    // fontWeight: 'bold',
  },
  contentTextSub: {
    fontSize: 18,
    margin: 8,
    // fontWeight: 'bold',
  },
  contentTextVerify: {
    fontSize: 18,
    marginTop: 20,
    // fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondForm: {
    marginTop: 10,
    marginBottom: 50,
    width: '100%',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 50,
  },
});

export default FindPWVerifyScreen;

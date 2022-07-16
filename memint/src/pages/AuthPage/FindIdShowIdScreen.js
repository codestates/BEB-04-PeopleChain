import React, {useRef, useState} from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BasicButton from '../../components/common/BasicButton';
import BackButton from '../../components/common/BackButton';

const FindIdShowIdScreen = ({navigation}) => {
  const goToSignInPage = () => {
    navigation.navigate('SignIn');
  };
  const goToFindPWPage = () => {
    navigation.navigate('FindPWVerify');
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
            가입하신 이메일은 {'\n'} "abcdefu@gmail.com" 입니다.
          </Text>
          <BasicButton
            style={styles.button}
            size="wide"
            text="로그인 하러 가기"
            hasMarginBottom
            onPress={goToSignInPage}
          />

          <BasicButton
            style={styles.button}
            size="wide"
            text="비밀번호 변경하러 가기"
            hasMarginBottom
            onPress={goToFindPWPage}
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
    fontSize: 20,
    paddingHorizontal: 10,
    marginTop: 64,
    marginBottom: 64,
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

export default FindIdShowIdScreen;

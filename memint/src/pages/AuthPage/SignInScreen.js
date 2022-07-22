import React, {useRef, useState} from 'react';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OauthButton from '../../components/AuthComponents/OauthButton';
import SignForm from '../../components/AuthComponents/SignForm';
import SignButtons from '../../components/AuthComponents/SignButtons';
import memintLogo from '../../assets/icons/memint.png';
import useUser from '../../utils/hooks/UseUser';
import useAuthActions from '../../utils/hooks/UseAuthActions';
import {signIn} from '../../lib/Auth';
const SignInScreen = ({navigation, route}) => {
  const userInfo = useUser();
  const {authorize} = useAuthActions();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };
  const [loading, setLoading] = useState();
  const goToSignUp = () => {
    Keyboard.dismiss();
    navigation.navigate('VerifyMobile');
    console.log(form);
  };

  const onSubmitSignIn = async () => {
    Keyboard.dismiss();
    const {email, password} = form;
    const info = {email, password};
    setLoading(true);
    try {
      const {user} = await signIn(info);
      console.log(user);
      authorize({
        id: user.uid,
        username: user.email,
        displayName: user.displayName,
      }),
        navigation.navigate('Main');
    } catch (e) {
      Alert.alert('실패');
      console.log(e);
    } finally {
      setLoading(false);
    }
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
        <Image source={memintLogo} style={styles.logo} />
        <View style={styles.form}>
          <SignForm
            onSubmit={onSubmitSignIn}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />

          {/* <SignButtons onSubmitSignIn={goToMain} onSubmitSignUp={goToSignUp} /> */}
          <SignButtons
            onSubmitSignIn={onSubmitSignIn}
            onSubmitSignUp={goToSignUp}
          />
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
              vendor="google"
              backgroundColor="#6699ff"
              hasMarginBottom
            />
            <OauthButton
              style={styles.oauthbutton}
              size="wide"
              text="Apple 계정으로 로그인"
              backgroundColor="#666666"
              vendor="apple"
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
  logo: {
    width: 160,
    height: 160,
    marginTop: 70,
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
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 16,
  },

  oauthbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    // paddingHorizontal: 16,
  },
});

export default SignInScreen;

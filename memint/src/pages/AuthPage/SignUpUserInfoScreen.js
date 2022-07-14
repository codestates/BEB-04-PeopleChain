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
import SelectDropdown from 'react-native-select-dropdown';
import BasicButton from '../../components/common/BasicButton';
import BorderedInput from '../../components/AuthComponents/BorderedInput';
import BackButton from '../../components/common/BackButton';
import CameraButton from '../../components/AuthComponents/CameraButton';

const SignUpUserInfoScreen = ({navigation}) => {
  const [form, setForm] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
    birth: '',
    gender: '',
    drinkCapa: '',
  });
  // const {isSignup} = route.params || {};
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log(form);
  };
  const goToNextPage = () => {
    navigation.navigate('SignUpUserDetail');
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <BackButton />
        <CameraButton />
        <View style={styles.form}>
          <Text style={styles.infoText}>닉네임</Text>
          <BorderedInput
            size="large"
            placeholder="닉네임"
            value={form.nickname}
            onChangeText={createChangeTextHandler('nickname')}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={'next'}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.infoText}>비밀번호</Text>
          <BorderedInput
            size="large"
            placeholder="비밀번호"
            value={form.password}
            onChangeText={createChangeTextHandler('password')}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={'next'}
            ref={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.infoText}>비밀번호 확인 </Text>
          <BorderedInput
            size="large"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChangeText={createChangeTextHandler('confirmPassword')}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={'next'}
            ref={confirmPasswordRef}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.infoText}>생년월일: </Text>
          <SelectDropdown
            data={[
              '1992',
              '1993',
              '1994',
              '1995',
              '1996',
              '1997',
              '1998',
              '1999',
              '2000',
              '2001',
              '2002',
              '2003',
            ]}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText=" "
            buttonStyle={styles.dropdown}
          />
          <Text style={styles.infoText}> 년 </Text>
          <SelectDropdown
            data={[
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
            ]}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText=" "
            buttonStyle={styles.dropdownSmall}
          />
          <Text style={styles.infoText}> 월 </Text>
          <SelectDropdown
            data={[
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
            ]}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText=" "
            buttonStyle={styles.dropdownSmall}
          />
          <Text style={styles.infoText}> 일 </Text>
        </View>
        <View style={styles.genderForm}>
          <Text style={styles.infoText}>성별: </Text>
          <SelectDropdown
            data={['남자', '여자']}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText=" "
            buttonStyle={styles.dropdown}
          />
        </View>
        <Text style={styles.alertText}>
          {'\n'} ❗️닉네임, 생년월일, 성별 등 개인을 식별할 수 있는 정보는 추후
          수정이 불가능합니다. {'\n'}
        </Text>
        <BasicButton
          style={styles.button}
          size="wide"
          text="다음 단계"
          hasMarginBottom
          onPress={goToNextPage}
        />
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
  infoText: {
    fontSize: 16,
  },
  alertText: {
    margin: 30,
    fontSize: 16,
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
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genderForm: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    margin: 50,
  },
  dropdown: {
    width: 100,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 30,
    backgroundColor: 'white',
  },
  dropdownSmall: {
    width: 40,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 30,
    backgroundColor: 'white',
  },
});

export default SignUpUserInfoScreen;
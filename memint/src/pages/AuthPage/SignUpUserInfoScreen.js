import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  Alert,
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
import {signUp} from '../../lib/Auth';
import {createUser, getUser} from '../../lib/Users';

const SignUpUserInfoScreen = ({navigation, route}) => {
  // const {params} = useRoute();
  const {uid} = route.params || {};
  // console.log(route.params);
  // console.log(route.params);
  const [form, setForm] = useState({
    nickName: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
  });

  const onSubmitTest = async () => {
    try {
      const profile = await getUser(uid);
      console.log(profile);
    } catch (e) {
      console.log(e);
    }
  };
  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    try {
      Keyboard.dismiss();
      console.log('uid is ' + uid);
      console.log(form);
      createUser({
        userId: uid,
        nickName: form.nickName,
        gender: form.gender,
        birth: `${form.birthYear}년 ${form.birthMonth}월 ${form.birthDay}일`,
        picture: null,
      });
      navigation.push('SignUpUserDetail', {uid: uid});
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitSignUp = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;
    const info = {email, password};
    if (password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
    } else {
      try {
        const {user} = await signUp(info);
        console.log(user);
        navigation.navigate('SignUpUserDetail');
      } catch (e) {
        Alert.alert('실패');
        console.log(e);
      } finally {
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <BackButton />
        <View style={styles.fullscreenSub}>
          <CameraButton />
          <View style={styles.form}>
            <Text style={styles.infoText}>닉네임</Text>
            <BorderedInput
              size="large"
              placeholder="닉네임"
              value={form.nickName}
              onChangeText={createChangeTextHandler('nickName')}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType={'next'}
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
                setForm({...form, birthYear: selectedItem});
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
                setForm({...form, birthMonth: selectedItem});
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
                setForm({...form, birthDay: selectedItem});
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
                setForm({...form, gender: selectedItem});
              }}
              defaultButtonText=" "
              buttonStyle={styles.dropdown}
            />
          </View>
          <Text style={styles.alertText}>
            {'\n'} ❗️닉네임, 생년월일, 성별 등 개인을 식별할 수 있는 정보는
            추후 수정이 불가능합니다. {'\n'}
          </Text>
          <BasicButton
            style={styles.button}
            width={300}
            height={40}
            textSize={17}
            margin={[5, 5, 5, 5]}
            text="다음 단계"
            hasMarginBottom
            onPress={onSubmit}
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
    marginTop: 32,
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
    width: 55,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    // paddingHorizontal: 16,
    borderRadius: 4,
    height: 30,
    backgroundColor: 'white',
  },
});

export default SignUpUserInfoScreen;

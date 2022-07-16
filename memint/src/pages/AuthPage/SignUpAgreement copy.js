import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import SelectDropdown from 'react-native-select-dropdown';
import CheckElement from '../../components/AuthComponents/CheckElement';

const SignUpAgreementScreen = ({navigation}) => {
  const [checkInfo, setCheckInfo] = useState({
    service: '',
    privacy: '',
    age: '',
    event: '',
    all: '',
  });

  const goToNextPage = () => {
    navigation.navigate('SignUpAlarm');
  };

  return (
    <SafeAreaView style={styles.fullscreen}>
      <BackButton />
      <View style={styles.fullscreenSub}>
        <Text style={styles.textMain}>서비스 약관에 동의해주세요</Text>
        <View style={styles.form}>
          <CheckElement checkInfo={checkInfo} setCheckInfo={setCheckInfo} />
          <Text style={styles.text}>서비스 약관에 동의</Text>
          <Text style={styles.textSub}>(필수)</Text>
        </View>
        <View style={styles.form}>
          <CheckElement checkInfo={checkInfo} setCheckInfo={setCheckInfo} />
          <Text style={styles.text}>개인정보 수집 및 이용동의</Text>
          <Text style={styles.textSub}>(필수)</Text>
        </View>
        <View style={styles.form}>
          <CheckElement checkInfo={checkInfo} setCheckInfo={setCheckInfo} />
          <Text style={styles.text}>만 19세 이상</Text>
          <Text style={styles.textSub}>(필수)</Text>
        </View>
        <View style={styles.form}>
          <CheckElement checkInfo={checkInfo} setCheckInfo={setCheckInfo} />
          <Text style={styles.text}>혜택 및 이벤트 알림 수신 동의</Text>
          <Text style={styles.textSub}>(필수)</Text>
        </View>
        <Text style={styles.contentText}>
          마케팅 수신 동의를 체크하지 않으면, 추천 모임 알림, 이벤트 소식 등 앱
          사용 멤버만을 위한 특별한 혜택 정보를 받을 수 없어요.
        </Text>
        <View style={styles.formAllAgree}>
          <CheckElement checkInfo={checkInfo} setCheckInfo={setCheckInfo} />
          <Text style={styles.text}>모두 동의합니다</Text>
        </View>
        <BasicButton
          style={styles.button}
          size="wide"
          text="회원가입 완료"
          hasMarginBottom
          onPress={goToNextPage}
        />
      </View>
    </SafeAreaView>
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
  form: {
    width: '100%',
    // height: '50',
    paddingHorizontal: 16,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  formAllAgree: {
    // marginBottom: 16,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formText: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  textAllAgree: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textMain: {
    paddingHorizontal: 6,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSub: {
    paddingHorizontal: 6,
    fontSize: 14,
    // fontWeight: 'bold',
    // margin: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  contentText: {
    fontSize: 12,
    marginHorizontal: 50,
    paddingHorizontal: 30,
    // marginTop: 30,
  },
  contentTextSub: {
    fontSize: 18,
    margin: 8,
  },
  contentTextVerify: {
    fontSize: 18,
    marginTop: 20,
  },
  tagsContainer: {
    flexWrap: 'wrap',
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
  secondForm: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 50,
  },
  dropdown: {
    fontSize: 10,
    width: 130,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 30,
  },
});

export default SignUpAgreementScreen;

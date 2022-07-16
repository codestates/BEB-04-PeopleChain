import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUpAlarmScreen = ({navigation}) => {
  const goToNextPage = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.fullscreen}>
      <BackButton />
      <View style={styles.fullscreenSub}>
        <Icon name="notifications-active" size={70} />
        <Text style={styles.textMain}>
          미팅에 꼭! 필요한 것만 잊지 않도록 알려드려요!
        </Text>
        <View>
          <Text style={styles.text}>⏰ 미팅 일정 안내 및 공지</Text>
          <Text style={styles.text}>🎉 혜택 가득 다양한 이벤트 소식</Text>
          <Text style={styles.text}>👨‍👩‍👦‍👦 함께하려는 미팅메이트들의 소식</Text>
          <Text style={styles.contentText}>
            알림 설정은 [프로필 {'>'} 설정 {'>'} 알림]에서 언제든지 변경할 수
            있습니다
          </Text>
        </View>
        <BasicButton
          style={styles.button}
          width={300}
          height={40}
          textSize={17}
          margin={[5, 5, 5, 5]}
          text="필수알림 동의하기"
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
    margin: 30,
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
    marginBottom: 10,
    fontSize: 20,
    paddingHorizontal: 16,
  },
  textMain: {
    paddingHorizontal: 6,
    marginTop: 50,
    marginBottom: 70,
    fontSize: 23,
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
    marginTop: 60,
    marginBottom: 20,
    fontSize: 12,
    // marginHorizontal: 50,
    // paddingHorizontal: 30,
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

export default SignUpAlarmScreen;

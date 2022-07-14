import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasicButton from '../common/BasicButton';

function RoomInfo({chatInfo}) {
  const [confirmed, setConfirmed] = useState(false);
  const [chatInfoState, setChatInfoState] = useState(chatInfo);
  const host = chatInfo.hostId;
  console.log(chatInfo);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.hilightText}>
          {host === '김개똥' ? '미팅 확정하기' : '미팅 참가 확정하기'}
        </Text>
        <BasicButton
          text="버튼"
          size="large"
          variant={confirmed ? 'disable' : 'basic'}
          onPress={() =>
            // 모달 창 띄워서 정말 confirm할건지 확인하는 작업 추가해야함
            setConfirmed(true)
          }
        />
        <Text style={styles.hilightText}>미팅 참여자</Text>
        <Person />
      </View>
    </View>
  );
}

function Person() {
  return (
    <View style={styles.person}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.personImage} />
        <Text style={styles.personName}>김철수</Text>
      </View>
      <View style={styles.isConfirmed}>
        <Text>확정</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '85%',
    height: '90%',
    backgroundColor: 'orange',
    alignItems: 'center',
  },
  hilightText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  person: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    marginLeft: 20,
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'green',
  },
  personName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  isConfirmed: {
    marginRight: 30,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 40,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
});

export default RoomInfo;

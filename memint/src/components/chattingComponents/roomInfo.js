import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasicButton from '../common/BasicButton';

function RoomInfo({
  chatInfo,
  setModalVisible,
  setIsHost,
  confirmation,
  roomConfirmation,
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [isRoomConfirmed, setIsRoomConfirmed] = useState(false);

  const host = chatInfo.hostId;
  const persons = chatInfo.joinersId.map((person, idx) => {
    return <Joiner person={person} confirmed={confirmed} ket={idx} />;
  });
  const roomConfirmed = () => {
    for (let i = 0; i < chatInfo.joinersId.length; i++) {
      if (chatInfo.joinersId[i].confirmed === false) return false;
    }
    return true;
  };

  useEffect(() => {
    if (roomConfirmed() === true) {
      setIsRoomConfirmed(true);
    }
    setConfirmed(confirmation);
  }, [confirmation]);

  const user = '김개똥';
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.hilightText}>
          {host === user ? '미팅 확정하기' : '미팅 참가 확정하기'}
        </Text>
        <BasicButton
          text="Click!"
          size="large"
          variant={
            user === host
              ? isRoomConfirmed
                ? 'basic'
                : 'disable'
              : confirmed
              ? 'disable'
              : 'basic'
          }
          onPress={() =>
            // 모달 창 띄워서 정말 confirm할건지 확인하는 작업 추가해야함
            {
              {
                user === host ? setIsHost(true) : setIsHost(false);
                setModalVisible(true);
              }
              // setIsRoomConfirmed(false);
              // setConfirmed(true);
            }
          }
        />
        <Text style={styles.hilightText}>미팅 참여자</Text>
        <Host person={chatInfo.hostId} confirmed={confirmed} />
        {persons}
      </View>
    </View>
  );
}

function Host({person}) {
  return (
    <View style={styles.person}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.personImage} />
        <Text style={styles.personName}>{person}</Text>
      </View>
    </View>
  );
}

function Joiner({person, confirmed}) {
  return (
    <View style={styles.person}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.personImage} />
        <Text style={styles.personName}>{person.name}</Text>
      </View>
      <View
        style={
          person.confirmed || confirmed
            ? styles.isConfirmed
            : {...styles.isConfirmed, backgroundColor: 'blue'}
        }>
        <Text style={{color: 'white'}}>확정</Text>
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

    alignItems: 'center',
  },
  hilightText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  person: {
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderTopWidth: 0.1,
    borderBottomWidth: 1,

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
    backgroundColor: 'lightgray',
  },
  personName: {
    fontSize: 17,
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

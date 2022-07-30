import React, {useEffect, useState, useMemo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import BasicButton from '../common/BasicButton';
import firestore from '@react-native-firebase/firestore';
const crown = require('../../pages/ChattingPage/dummydata/images/crown.png');
const user = '연습용계정1';

function RoomInfo({chatInfo, meetingEnd, setMeetingEnd, isFixed, userDetail}) {
  const [confirmed, setConfirmed] = useState(false);
  const [nickNames, setNickNames] = useState('');
  const [states, setStates] = useState('');
  const [people, setPeople] = useState('');

  const getIsFixed = useMemo(
    () =>
      firestore()
        .collection('Meeting')
        .doc(chatInfo.id)
        .onSnapshot(result => {
          setStates(
            result
              .data()
              .members.map(el => {
                return Object.values(el);
              })
              .reduce((acc, cur) => {
                return [...acc, ...cur];
              }),
          );
        }),
    [chatInfo],
  );

  useEffect(() => {
    // setMember(Object.values(isFixed));

    const ids = Object.keys(userDetail);

    const arr = [];

    ids.forEach(el => {
      arr.push([userDetail[el].nickName, userDetail[el].nftProfile]);
    });

    setNickNames(arr);

    getIsFixed;
    const people = () => {
      if (states) {
        return setPeople(
          states.slice(1).map((el, idx) => {
            return (
              <Joiner
                state={el}
                nickName={nickNames.slice(1)[idx][0]}
                img={nickNames.slice(1)[idx][1]}
                key={idx}
              />
            );
          }),
        );
      }
    };
    people();
  }, [isFixed, getIsFixed, chatInfo, states]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.hilightText}>미팅 참여자</Text>
        <Host
          nickName={nickNames[0][0]}
          img={nickNames[0][1]}
          confirmed={confirmed}
        />
        {people}
      </View>
      <BasicButton
        text="미팅종료"
        size="large"
        variant={meetingEnd ? 'disable' : 'basic'}
        onPress={() => {
          setMeetingEnd(true);
        }}
      />
    </View>
  );
}

function Host({nickName, img}) {
  return (
    <View style={styles.person}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.personImage} source={{uri: img}} />
        <View style={{position: 'absolute', height: 95}}>
          <Image
            source={crown}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.personName}>{nickName}</Text>
      </View>
    </View>
  );
}

function Joiner({nickName, state, img}) {
  return (
    <View style={styles.person}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.personImage} source={{uri: img}} />
        <Text style={styles.personName}>{nickName}</Text>
      </View>
      <View
        style={
          state === 'accepted'
            ? styles.isConfirmed
            : {...styles.isConfirmed, backgroundColor: '#609afa'}
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
    marginLeft: 10,
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

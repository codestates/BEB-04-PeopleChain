import React, {useEffect, useState, useMemo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import BasicButton from '../common/BasicButton';
import firestore from '@react-native-firebase/firestore';
const crown = require('../../pages/ChattingPage/dummydata/images/crown.png');

function RoomInfo({chatInfo, confirmation, meetingEnd, setMeetingEnd}) {
  const [confirmed, setConfirmed] = useState(false);
  const [isRoomConfirmed, setIsRoomConfirmed] = useState(false);

  const userRef = useMemo(() => firestore().collection('User'), []);

  // const host = chatInfo.hostId;
  // const persons = chatInfo.joinersId.map((person, idx) => {
  //   return <Joiner person={person} confirmed={confirmed} key={idx} />;
  // });
  // const roomConfirmed = () => {
  //   for (let i = 0; i < chatInfo.joinersId.length; i++) {
  //     if (chatInfo.joinersId[i].confirmed === false) return false;
  //   }
  //   return true;
  // };

  useEffect(() => {
    Promise.all(
      chatInfo.members.map(el => {
        // console.log(Object.keys(el)[0]);

        userRef
          .doc(Object.keys(el)[0])
          .get()
          .then(result => console.log(result));
      }),
    );
  }, [chatInfo.members, userRef]);

  const user = '연습용계정1';
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.hilightText}>미팅 참여자</Text>
        <Host person={chatInfo.hostId} confirmed={confirmed} />
        {/* {persons} */}
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

function Host({person}) {
  return (
    <View style={styles.person}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.personImage} />
        <View style={{position: 'absolute', height: 95}}>
          <Image
            source={crown}
            style={{width: 40, height: 40}}
            resizeMode="contain"
          />
        </View>
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

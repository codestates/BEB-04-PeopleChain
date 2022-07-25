import React, {useEffect, useState, useContext, useMemo} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import ChatContext from './context/chatContext';
import firestore from '@react-native-firebase/firestore';
import useUser from '../../utils/hooks/UseUser';
import {useMeeting} from '../../utils/hooks/UseMeeting';

function ChattingListPage({navigation}) {
  const [chatLog, setChatLog] = useState('');
  const user = useUser();
  const Meetings = useMeeting();
  console.log(Meetings);
  useEffect(() => {
    const getChatLogs = async () => {
      const meetingList = [];
      const userInfo = await firestore().collection('User').doc(user.id).get();

      userInfo.data().createdroomId &&
        meetingList.push(...userInfo.data().createdroomId);
      userInfo.data().joinedroomId &&
        meetingList.push(...userInfo.data().joinedroomId);

      const meetingInfos = await Promise.all(
        meetingList.map(async meetingId => {
          const meetingInfo = await firestore()
            .collection('Meeting')
            .doc(meetingId)
            .get();

          const lastMsg = await firestore()
            .collection('Meeting')
            .doc(meetingId)
            .collection('Messages')
            .orderBy('createdAt')
            .limit(1)
            .get();

          if (lastMsg.docs.length === 0) {
            return {...meetingInfo.data(), id: meetingId};
          } else {
            return {
              ...meetingInfo.data(),
              id: meetingId,
              lastMsg: lastMsg.docs[0].data().text,
              lastTime: lastMsg.docs[0]
                .data()
                .createdAt.toDate()
                .toLocaleString()
                .slice(6),
            };
          }
        }),
      );

      setChatLog(meetingInfos);
    };
    getChatLogs();
  }, [user]);

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={chatLog}
      renderItem={({item}) => <MetaData item={item} navigation={navigation} />}
    />
  );
}

function MetaData({item, navigation}) {
  const [lastMsg, setLastMsg] = useState('');
  const [lastTime, setLastTime] = useState('');
  const MessageRef = useMemo(
    () => firestore().collection('Meeting').doc(item.id).collection('Messages'),
    [item.id],
  );
  useEffect(() => {
    const getContent = async () => {
      MessageRef.orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot(
          result => {
            if (result.docs.length === 0) {
              return;
            } else if (
              result.docChanges()[result.docChanges().length - 1].doc._data
                .createdAt
            ) {
              setLastMsg(result.docs[0].data().text);
              setLastTime(
                result.docs[0]
                  .data()
                  .createdAt.toDate()
                  .toLocaleString()
                  .slice(6),
              );
            }
          },
          [MessageRef],
        );
    };
    getContent();
  }, [MessageRef]);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChattingRoom', {data: item})}>
      <View style={styles.container}>
        <View style={styles.image} />
        {/* source={item.image} resizeMode="contain" /> */}
        <View style={styles.chatInfo}>
          <View>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text>{lastMsg ? lastMsg : '채팅을 시작해보세요!'}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text>{lastTime ? lastTime : ''}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    // paddingLeft: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 7,
    backgroundColor: 'lightblue',
  },
  chatInfo: {
    flexDirection: 'row',
    height: '100%',
    width: '80%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingLeft: 10,
    flexWrap: 'wrap',
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  titleText: {
    marginTop: 10,
    paddingBottom: 12,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ChattingListPage;

import React, {useEffect, useState, useMemo} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AddChat from './addChat';
import UserInfoModal from '../common/UserInfoModal';
import firestore from '@react-native-firebase/firestore';

function ChatText({data, roomInfo, userNickName}) {
  // const [chats, setChats] = useState(chattings);
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [chattings, setChattings] = useState('');
  const user = '연습용계정1';

  const chatRef = useMemo(
    () => firestore().collection('Meeting').doc(data.id).collection('Messages'),
    [data.id],
  );

  useEffect(() => {
    const getContent = async () => {
      chatRef.orderBy('createdAt').onSnapshot(result => {
        // 아래 부분을 if문없이 넘겨주면, createdAt을 서버 시간으로 설정하였는데 서버에 올라가기 전에 로컬에 미리 정보를 가져오므로 createdAt이 null이어서 에러가 생기게 된다.
        if (result.docs.length === 0) {
          return;
        } else if (
          result.docChanges()[result.docChanges().length - 1].doc._data
            .createdAt
          // 아래에서 기본 chat을 살리려고 [...chats, result.docs[result.docs.length-1]]을 setChats로 보내주려 했는데 계속해서 에러가 난다.
          // 그런데 다시 생각해보니 어차피 윗줄의 코드도 원본을 건드리지 않고 새로운 배열을 만들어서 가져오는 것이기 때문에 같은 개념이다 싶어서 안하기로 했다.
        ) {
          setChattings(result.docs);
        }
      });
    };
    getContent();
  }, [chatRef]);

  return (
    <View style={roomInfo ? {flex: 1, opacity: 0.8} : {flex: 1}}>
      <FlatList
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
        style={styles.container}
        data={chattings}
        renderItem={({item}) =>
          item.data().sender === user ? (
            <MyChat item={item} userNickName={userNickName} />
          ) : (
            <NotMyChat
              userNickName={userNickName}
              item={item}
              setUserInfoModalVisible={setUserInfoModalVisible}
              setUserInfo={setUserInfo}
            />
          )
        }
      />
      <UserInfoModal
        userInfo={userInfo}
        nButtonText="아니오"
        pButtonText="네"
        userInfoModalVisible={userInfoModalVisible}
        setUserInfoModalVisible={setUserInfoModalVisible}
      />
      <AddChat chatId={data.id} />
    </View>
  );
}

function NotMyChat({item, setUserInfoModalVisible, setUserInfo, userNickName}) {
  return (
    <View style={styles.messageWrapper}>
      {/* 클릭할 시 유저 정보를 열겠냐고 물어보는 모달 창 띄우는 값 true로 설정 */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setUserInfoModalVisible(true);
          setUserInfo(item.sender);
        }}>
        <View style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text style={styles.senderName}>
          {userNickName[item.data().sender]}
        </Text>
        <View style={styles.messageBody}>
          <Text style={{padding: 3}}>{item.data().text}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={{marginBottom: 7, fontSize: 10, color: 'gray'}}>
          {item
            .data()
            .createdAt.toDate()
            .toLocaleString()
            .slice(
              6,
              item.data().createdAt.toDate().toLocaleString().length - 3,
            )}
        </Text>
      </View>
    </View>
  );
}

function MyChat({item, userNickName}) {
  return (
    <View style={styles.MymessageWrapper}>
      <View style={styles.image} />
      <View style={[styles.textWrapper, {alignItems: 'flex-end'}]}>
        <Text style={styles.senderName}>
          {userNickName[item.data().sender]}
        </Text>
        <View style={[styles.messageBody, {backgroundColor: 'lightyellow'}]}>
          <Text style={{padding: 3}}>{item.data().text}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={{marginBottom: 7, fontSize: 10, color: 'gray'}}>
          {item
            .data()
            .createdAt.toDate()
            .toLocaleString()
            .slice(
              6,
              item.data().createdAt.toDate().toLocaleString().length - 3,
            )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
  },
  messageWrapper: {
    flexDirection: 'row',
    width: '60%',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'gray',
    marginRight: 7,
    marginLeft: 7,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  senderName: {
    marginTop: 10,
    paddingBottom: 6,
    fontSize: 15,
    fontWeight: 'bold',
  },
  messageBody: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 3,
    width: 'auto',
    height: 'auto',
  },
  date: {
    justifyContent: 'flex-end',
    marginRight: 7,
    marginLeft: 7,
  },
  MymessageWrapper: {
    flexDirection: 'row-reverse',
    width: '60%',
    marginLeft: 'auto',
    marginBottom: 10,
  },
});

export default ChatText;

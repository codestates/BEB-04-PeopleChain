import React, {useState} from 'react';
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

function ChatText({chat, roomInfo}) {
  const user = '김영희';
  const [chats, setChats] = useState(chat);
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  const example = chats.map(item => {
    return item.sender === user ? (
      <MyChat item={item} />
    ) : (
      <NotMyChat item={item} />
    );
  });

  return (
    <View style={roomInfo ? {flex: 1, opacity: 0.8} : {flex: 1}}>
      <FlatList
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
        style={styles.container}
        data={chats}
        renderItem={({item}) =>
          item.sender === user ? (
            <MyChat item={item} />
          ) : (
            <NotMyChat
              item={item}
              setUserInfoModalVisible={setUserInfoModalVisible}
              setUserInfo={setUserInfo}
            />
          )
        }
      />
      {/* <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
          position: 'absolute',
          flexWrap: 'wrap',
        }}>
        {example}
      </ScrollView> */}
      <UserInfoModal
        userInfo={userInfo}
        nButtonText="아니오"
        pButtonText="네"
        userInfoModalVisible={userInfoModalVisible}
        setUserInfoModalVisible={setUserInfoModalVisible}
      />
      <AddChat chats={chats} setChats={setChats} />
    </View>
  );
}

function NotMyChat({item, setUserInfoModalVisible, setUserInfo}) {
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
        <Text style={styles.senderName}>{item.sender}</Text>
        <View style={styles.messageBody}>
          <Text style={{padding: 3}}>{item.body}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={{marginBottom: 7, fontSize: 10, color: 'gray'}}>
          {item.createdAt}
        </Text>
      </View>
    </View>
  );
}

function MyChat({item}) {
  return (
    <View style={styles.MymessageWrapper}>
      <View style={styles.image} />
      <View style={[styles.textWrapper, {alignItems: 'flex-end'}]}>
        <Text style={styles.senderName}>{item.sender}</Text>
        <View style={[styles.messageBody, {backgroundColor: 'lightyellow'}]}>
          <Text style={{padding: 3}}>{item.body}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={{marginBottom: 7, fontSize: 10, color: 'gray'}}>
          {item.createdAt}
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

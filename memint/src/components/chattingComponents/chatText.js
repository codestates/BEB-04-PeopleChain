import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import AddChat from './addChat';

function ChatText({chat, setModalVisible, roomInfo}) {
  const user = '김영희';
  const [chats, setChats] = useState(chat);
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
            <NotMyChat item={item} setModalVisible={setModalVisible} />
          )
        }
      />
      <AddChat chats={chats} setChats={setChats} />
    </View>
  );
}

function NotMyChat({item, setModalVisible}) {
  return (
    <View style={styles.messageWrapper}>
      {/* 클릭할 시 유저 정보를 열겠냐고 물어보는 모달 창 띄우는 값 true로 설정 */}
      <TouchableOpacity activeOpacity={1}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
  },
  messageWrapper: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    width: '60%',
    // height: 'auto',
    borderColor: 'black',
    borderWidth: 1,
  },
  image: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green',
  },
  textWrapper: {
    justifyContent: 'center',
    backgroundColor: 'red',
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
    margin: 4,
    width: 'auto',
    height: 'auto',
  },
  date: {
    backgroundColor: 'purple',
    justifyContent: 'flex-end',
  },
  MymessageWrapper: {
    flexDirection: 'row-reverse',
    backgroundColor: 'pink',
    width: '60%',
    marginLeft: 'auto',
    // height: 'auto',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ChatText;

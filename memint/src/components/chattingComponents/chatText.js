import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';

function ChatText({chat}) {
  // const chats = chat.map(item => {
  //   return <NotMyChat item={item} />;
  // });
  return (
    <View>
      <FlatList
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
        style={styles.container}
        data={chat}
        renderItem={({item}) =>
          item.sender === '김삼묵' ? (
            <MyChat item={item} />
          ) : (
            <NotMyChat item={item} />
          )
        }
      />
      {/* {chats} */}
    </View>
  );
}

function NotMyChat({item}) {
  return (
    <View style={styles.messageWrapper}>
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
    height: '85%',
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

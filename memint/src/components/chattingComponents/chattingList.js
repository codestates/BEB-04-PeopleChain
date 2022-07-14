import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import ChatContext from './context/chatContext';

function ChattingList({navigation}) {
  const {chatLog} = useContext(ChatContext);
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={chatLog}
      renderItem={({item}) => <MetaData item={item} navigation={navigation} />}
    />
  );
}

function MetaData({item, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChattingRoom', {item})}>
      <View style={styles.container}>
        <Image style={styles.image} source={item.image} resizeMode="contain" />
        <View style={styles.chatInfo}>
          <View>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text>{item.chat[item.chat.length - 1].body}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text>{item.chat[item.chat.length - 1].createdAt}</Text>
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
    width: 70,
    height: 70,
    borderRadius: 36,
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

export default ChattingList;

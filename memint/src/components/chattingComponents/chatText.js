import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';

function ChatText({chat}) {
  return (
    <FlatList
      data={chat}
      renderItem={({item}) => (
        <View style={styles.mssageWrapper}>
          <View style={styles.image} />
          <View style={styles.textWrapper}>
            <Text style={styles.senderName}>{item.sender}</Text>
            <View style={styles.messageBody}>
              <Text style={{padding: 3}}>{item.body}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  mssageWrapper: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    width: '100%',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 36,
    backgroundColor: 'green',
  },
  textWrapper: {
    justifyContent: 'center',
    height: 70,
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
  },
});

export default ChatText;

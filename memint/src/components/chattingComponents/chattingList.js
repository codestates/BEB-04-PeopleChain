import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';

function ChattingList({chattings, navigation}) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={chattings}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ChattingRoom', {id: item.id})}>
          <View style={styles.container}>
            <Text>{item.text}</Text>
            <View style={styles.chatInfo}>
              <Text style={{marginTop: 10}}>채팅방 이름</Text>
              <Text style={{marginBottom: 15}}>마지막 채팅 내용</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    paddingLeft: 8,
    alignItems: 'center',

    // justifyContent: 'space-between',
  },
  chatInfo: {
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default ChattingList;

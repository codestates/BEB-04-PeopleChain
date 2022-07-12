import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

function ChattingList({chattings, navigation}) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={chattings}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ChattingRoom', {item})}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={item.image}
              resizeMode="contain"
            />
            <View style={styles.chatInfo}>
              <View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text>마지막 채팅 내용</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text>마지막 채팅 날짜</Text>
              </View>
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

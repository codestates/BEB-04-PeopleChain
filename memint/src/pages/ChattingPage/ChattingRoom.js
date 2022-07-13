import React, {useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ChatText from '../../components/chattingComponents/chatText';
import {useNavigation} from '@react-navigation/native';

function ChattingRoom({route}) {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({title: route.params.item.title});
  });
  return <ChatText chat={route.params.item.chat} />;
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    justifyContent: 'flex-end',
    backgroundColor: 'green',
    // justifyContent: 'flex-end',
    // flexDirection: 'column-reverse',
  },
});

export default ChattingRoom;

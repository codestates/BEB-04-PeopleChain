import React, {useEffect} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import ChatText from '../../components/chattingComponents/chatText';

function ChattingRoom({navigation, route}) {
  useEffect(() => {
    navigation.setOptions({title: route.params.item.title});
  });
  return (
    <View style={styles.container}>
      <ChatText chat={route.params.item.chat} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'blue',
    // justifyContent: 'flex-end',
    // flexDirection: 'column-reverse',
  },
});

export default ChattingRoom;

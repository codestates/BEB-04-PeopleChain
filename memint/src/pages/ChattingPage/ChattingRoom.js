import React from 'react';
import {View, Text} from 'react-native';

function ChattingRoom({route}) {
  return (
    <View>
      <Text>ChattingRoom id {route.params.id} 페이지 입니다.</Text>
    </View>
  );
}

export default ChattingRoom;

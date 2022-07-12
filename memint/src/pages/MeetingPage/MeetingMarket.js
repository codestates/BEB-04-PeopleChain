import React from 'react';
import {Text, View, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function MeetingMarket({navigation}) {
  return (
    <SafeAreaView>
      <Text>MeetingPage 입니다.</Text>
      <Button
        title="이동"
        onPress={() => {
          navigation.navigate('MeetingDetail');
        }}
      />
      <Button
        title="생성"
        onPress={() => {
          navigation.navigate('MeetingCreate');
        }}
      />
    </SafeAreaView>
  );
}

export default MeetingMarket;

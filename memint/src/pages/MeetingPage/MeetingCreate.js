import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import BackButton from '../../components/BackButton';

function MeetingCreate() {
  return (
    <SafeAreaView>
      <BackButton />
      <Text>생성</Text>
    </SafeAreaView>
  );
}

export default MeetingCreate;

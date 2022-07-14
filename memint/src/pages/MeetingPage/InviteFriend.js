import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import BackButton from '../../components/common/BackButton';

function InviteFriend() {
  return (
    <SafeAreaView>
      <BackButton />
      <Text>친구 초대</Text>
    </SafeAreaView>
  );
}

export default InviteFriend;

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import BackButton from '../../components/common/BackButton';

function Wallet() {
  return (
    <SafeAreaView>
      <BackButton />
      <Text>wallet</Text>
    </SafeAreaView>
  );
}

export default Wallet;

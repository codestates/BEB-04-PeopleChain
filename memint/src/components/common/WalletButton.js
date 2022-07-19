import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

/*
props 필요 없음.
<WalletButton />
*/

function WalletButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.walletButton}
      onPress={() => navigation.navigate('Wallet')}>
      <Text style={styles.buttonText}>Wallet</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  walletButton: {
    position: 'absolute',
    width: 80,
    height: 40,
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WalletButton;

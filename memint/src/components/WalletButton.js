import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// import시 따로 넘겨줄 props는 없습니다.
// <WalletButton />

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

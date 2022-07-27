import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      {/* <Text style={styles.buttonText}>Wallet</Text> */}
      <Icon name="account-balance-wallet" size={27} color={'white'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  walletButton: {
    position: 'absolute',
    width: 70,
    height: 45,
    right: 20,
    bottom: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WalletButton;

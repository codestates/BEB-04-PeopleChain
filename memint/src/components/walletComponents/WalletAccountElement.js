import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import klayIcon from '../../assets/icons/klaytn-klay-logo.png';
import lovechainIcon from '../../assets/icons/lovechain.png';
function WalletAccountElement({onPress, balance, content}) {
  const imgSrc = content === 'KLAY' ? klayIcon : lovechainIcon;
  return (
    <View style={[styles.button]}>
      <View style={styles.tokenWrapper}>
        <Image source={imgSrc} style={styles.icon} />
        <Text style={styles.contentText}>{content}</Text>
      </View>
      <Text style={styles.balanceText}>{balance}</Text>
    </View>
  );
}

WalletAccountElement.defaultProps = {
  width: 200,
  height: 40,
  borderColor: '#bdbddd',
  balance: 0,
  content: 'KLAY',
  onPress: () => {},
};

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    marginLeft: 20,
    // backgroundColor: 'green',
  },
  tokenWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceText: {
    marginRight: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    // paddingHorizontal: 16,
    width: 330,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
  },
});

export default WalletAccountElement;

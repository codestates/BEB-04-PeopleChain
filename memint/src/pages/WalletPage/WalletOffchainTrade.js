import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import BackButton from '../../components/common/BackButton';
import WalletCustomButton from '../../components/walletComponents/WalletCustomButton';
import {useToast} from '../../utils/hooks/useToast';
import WalletOffchainRecieve from './WalletOffchainRecieve';
import WalletOffchainTransfer from './WalletOffchainTransfer';

const WalletOffchainTrade = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recieveSelected, setRecieveSelected] = useState(true);
  const [transferSelected, setTransferSelected] = useState(false);
  const {showToast} = useToast();
  const handleRecieveSelect = () => {
    setRecieveSelected(true);
    setTransferSelected(false);
  };

  const handleTransferSelect = () => {
    setRecieveSelected(false);
    setTransferSelected(true);
  };

  return (
    <SafeAreaView>
      <BackButton />
      <View style={styles.accountWrapper}>
        <Image
          source={require('../../assets/icons/lovechain.png')}
          style={styles.icon}
        />
        <View style={styles.accountTextWrapper}>
          <Text style={styles.balanceText}>12</Text>
          <Text style={styles.lcnText}> LCN</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <WalletCustomButton
            style={styles.buttonWrapper}
            width={140}
            height={50}
            textSize={17}
            margin={[5, 0, 5, 5]}
            text="가져오기"
            hasMarginBottom
            onPress={handleRecieveSelect}
            selected={recieveSelected}
          />
          <WalletCustomButton
            style={styles.buttonWrapper}
            width={140}
            height={50}
            textSize={17}
            margin={[5, 5, 5, 0]}
            text="내보내기"
            hasMarginBottom
            onPress={handleTransferSelect}
            selected={transferSelected}
          />
        </View>
        {recieveSelected ? (
          <WalletOffchainRecieve />
        ) : (
          <WalletOffchainTransfer />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  accountWrapper: {
    backgroundColor: 'white',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountTextWrapper: {flexDirection: 'row', alignItems: 'flex-end'},
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 50,
    width: 50,
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  balanceText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 20,
    marginBottom: 10,
  },
  lcnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
export default WalletOffchainTrade;

import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import WalletAccountElement from '../../components/walletComponents/WalletAccountElement';
import SingleModal from '../../components/common/SingleModal';
import WalletCustomModal from '../../components/walletComponents/WalletCustomModal';
import {useToast} from '../../utils/hooks/useToast';

const WalletOnchainMain = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const {showToast} = useToast();

  const goToOnchainTrade = () => {
    navigation.navigate('WalletOnchainTrade');
  };

  return (
    <View>
      <View style={styles.contentContainer}>
        <Text style={styles.balanceText}>0 KLAY</Text>
        <View style={styles.address}>
          <Text style={styles.addressText}>0xFYgBQhnkgHNDDlasKSDNBMZGxRE</Text>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/receive.png')}
              />
            </TouchableOpacity>
            <Text>Receive</Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => {
                setTransferModalVisible(true);
              }}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/money-transfer.png')}
              />
            </TouchableOpacity>
            <Text>Transfer</Text>
          </View>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={goToOnchainTrade}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/transfer.png')}
              />
            </TouchableOpacity>
            <Text>Trade</Text>
          </View>
        </View>
        <Text style={styles.walletText}>Wallet Account</Text>
        <WalletAccountElement content="KLAY" balance={0} />
        <WalletAccountElement content="LCN" balance={0} />
      </View>
      <SingleModal
        text="Recieve KLAY"
        buttonText="주소 복사하기"
        body={
          <View style={styles.address}>
            <Text style={styles.addressText}>
              0xFYgBQhnkgHNDDlasKSDNBMZGxRE
            </Text>
          </View>
        }
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pFunction={() => {
          setModalVisible(false);
          showToast('success', '주소가 복사되었습니다!');
        }}
      />
      <WalletCustomModal
        text="Recieve KLAY"
        buttonText="주소 복사하기"
        modalVisible={transferModalVisible}
        setModalVisible={setTransferModalVisible}
        nFunction={() => {
          setTransferModalVisible(false);
          navigation.navigate('WalletKlayTransfer');
        }}
        pFunction={() => {
          setTransferModalVisible(false);
          navigation.navigate('WalletLcnTransfer');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  contentContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  address: {
    flexDirection: 'row',
    // paddingHorizontal: 16,
    width: 270,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  iconCircle: {
    flexDirection: 'row',
    // paddingHorizontal: 16,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    // backgroundColor: 'green',
  },
  balanceText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  walletText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default WalletOnchainMain;

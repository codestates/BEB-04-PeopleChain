import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../../components/common/BackButton';
import LargeLcnButton from '../../components/walletComponents/LargeLcnButton';
import SmallLcnButton from '../../components/walletComponents/SmallLcnButton';
import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';
import {useToast} from '../../utils/hooks/useToast';
import useUser from '../../utils/hooks/UseUser';
import {ETHToLCN} from '../../lib/api/wallet';
const WalletOnchainTrade = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {showToast} = useToast();
  const [fromEth, setFromEth] = useState(true);
  const userInfo = useUser();
  const [amount, setAmount] = useState({
    fromAmount: '0',
    toAmount: '0',
  });
  const createChangeAmountHandler = name => value => {
    setAmount({
      ...amount,
      [name]: Number(value),
      toAmount: fromEth ? Number(value) * 1000 : Number(value) / 1000,
    });
  };
  const transferETHToLCN = async () => {
    console.log(amount.fromAmount);
    const body = {
      id: userInfo.id,
      ethAmount: amount.fromAmount,
    };
    try {
      await ETHToLCN(body);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView>
      <BackButton />
      <Text style={styles.tradeText}>Trade</Text>
      <View style={styles.buttonContainer}>
        <LargeLcnButton
          amount={amount.fromAmount}
          setAmount={createChangeAmountHandler('fromAmount')}
          balance={fromEth ? userInfo.ethAmount : userInfo.onChainTokenAmount}
          width={330}
          height={120}
          margin={[30, 0, 10, 0]}
          text="From"
          content={fromEth ? 'ETH' : 'LCN'}
          //   backgroundColor={'lightblue'}
        />
        <TouchableOpacity onPress={() => setFromEth(!fromEth)}>
          <Icon name="autorenew" size={70} />
        </TouchableOpacity>
        <SmallLcnButton
          amount={amount.toAmount}
          width={330}
          height={90}
          margin={[10, 0, 0, 0]}
          text="To (Estimated)"
          content={fromEth ? 'LCN' : 'ETH'}
        />
        <BasicButton
          margin={[100, 0, 0, 0]}
          width={330}
          text={'교환하기'}
          textSize={18}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <DoubleModal
        text="교환하시겠습니까?"
        nButtonText="아니요"
        pButtonText="네"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nFunction={() => {
          setModalVisible(false);
        }}
        pFunction={async () => {
          await transferETHToLCN();
          setModalVisible(false);
          showToast('success', '완료되었습니다!');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
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
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tradeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 40,
    marginBottom: 50,
  },
});
export default WalletOnchainTrade;

import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import BackButton from '../../components/common/BackButton';
import WalletCustomButton from '../../components/walletComponents/WalletCustomButton';
import LargeLcnButton from '../../components/walletComponents/LargeLcnButton';
import SmallLcnButton from '../../components/walletComponents/SmallLcnButton';
import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';
import {useToast} from '../../utils/hooks/useToast';
import useUser from '../../utils/hooks/UseUser';
import {toOffChain} from '../../lib/api/wallet';
const WalletOffchainRecieve = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {showToast} = useToast();
  const user = useUser();
  const [amount, setAmount] = useState();

  const sendToOffChain = async () => {
    const body = {
      id: user.id,
      tokenAmount: Number(amount),
      currentTokenAmount: Number(user.tokenAmount),
    };
    try {
      await toOffChain(body);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <LargeLcnButton
          balance={user.onChainTokenAmount}
          width={330}
          height={120}
          margin={[30, 0, 10, 0]}
          text={'From'}
          amount={amount}
          setAmount={setAmount}
          backgroundColor={'lightblue'}
        />
        <Icon name="arrow-downward" size={70} />
        <SmallLcnButton
          width={330}
          height={60}
          margin={[10, 0, 0, 0]}
          text={'To'}
          amount={amount}
        />
        <BasicButton
          margin={[30, 0, 0, 0]}
          width={330}
          text={'가져오기'}
          textSize={18}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <DoubleModal
        text="LCN을 내부 지갑으로 가져오겠습니까?"
        //body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="네"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nFunction={() => {
          setModalVisible(false);
        }}
        pFunction={async () => {
          await sendToOffChain();
          setModalVisible(false);
          showToast('success', 'LCN을 가져왔습니다!');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 30,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  accountWrapper: {
    backgroundColor: 'white',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountTextWrapper: {flexDirection: 'row', alignItems: 'flex-end'},
  contentContainer: {
    // flex: 1,
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
export default WalletOffchainRecieve;

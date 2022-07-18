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

const WalletOffchainTransfer = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recieveSelected, setRecieveSelected] = useState(false);
  const [transferSelected, setTransferSelected] = useState(true);
  const {showToast} = useToast();
  const handleRecieveSelect = () => {
    setRecieveSelected(true);
    setTransferSelected(false);
    navigation.navigate('WalletOffchainRecieve');
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
        <SmallLcnButton
          text={'To'}
          width={330}
          height={60}
          margin={[30, 0, 10, 0]}
          backgroundColor={'lightblue'}
        />
        <Icon name="arrow-upward" size={70} />
        <LargeLcnButton
          balance={12}
          width={330}
          height={120}
          margin={[10, 0, 0, 0]}
        />
        <BasicButton
          margin={[30, 0, 0, 0]}
          width={330}
          text={'내보내기'}
          textSize={18}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <DoubleModal
        text="LCN을 외부 지갑으로 내보내시겠습니까?"
        //body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="네"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        nFunction={() => {
          setModalVisible(false);
        }}
        pFunction={() => {
          setModalVisible(false);
          showToast('success', 'LCN을 내보냈습니다!');
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
export default WalletOffchainTransfer;

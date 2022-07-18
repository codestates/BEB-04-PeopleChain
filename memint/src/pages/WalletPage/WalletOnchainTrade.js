import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import BackButton from '../../components/common/BackButton';
import LargeLcnButton from '../../components/walletComponents/LargeLcnButton';
import SmallLcnButton from '../../components/walletComponents/SmallLcnButton';
import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';
import {useToast} from '../../utils/hooks/useToast';

const WalletOnchainTrade = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {showToast} = useToast();

  return (
    <SafeAreaView>
      <BackButton />
      <Text style={styles.tradeText}>Trade</Text>
      <View style={styles.buttonContainer}>
        <LargeLcnButton
          balance={0}
          width={330}
          height={120}
          margin={[30, 0, 10, 0]}
          text="From"
          content="KLAY"
          //   backgroundColor={'lightblue'}
        />
        <Icon name="autorenew" size={70} />
        <SmallLcnButton
          width={330}
          height={90}
          margin={[10, 0, 0, 0]}
          text="To (Estimated)"
          content="LCN"
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
        pFunction={() => {
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

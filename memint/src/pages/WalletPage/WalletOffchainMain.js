import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import WalletCustomButton from '../../components/walletComponents/WalletCustomButton';
import TotalAccountButton from '../../components/walletComponents/TotalAccountButton';
import HistoryButton from '../../components/walletComponents/HistoryButton';

function WalletOffchainMain({navigation}) {
  const [walletSelected, setWalletSelected] = useState(false);
  const [spendingSelected, setSpendingSelected] = useState(true);
  const dummyHistory = [
    {
      id: 10,
      time: '2022.07.15 17:12:48',
      balanceChange: '+5',
      balance: 10,
      content: '후기 참여',
    },
    {
      id: 9,
      time: '2022.07.11 12:11:35',
      balanceChange: '+2',
      balance: 5,
      content: '미팅 참여',
    },
    {
      id: 8,
      time: '2022.07.09 22:44:54',
      balanceChange: '-2',
      balance: 3,
      content: 'NFT 민팅',
    },
    {
      id: 7,
      time: '2022.07.08 21:34:54',
      balanceChange: '+2',
      balance: 3,
      content: '후기 참여',
    },
    {
      id: 6,
      time: '2022.07.08 21:34:54',
      balanceChange: '-1',
      balance: 3,
      content: 'NFT 민팅',
    },
    {
      id: 5,
      time: '2022.07.04 05:05:11',
      balanceChange: '-2',
      balance: 4,
      content: '미팅 개설',
    },
    {
      id: 4,
      time: '2022.07.03 10:10:54',
      balanceChange: '-1',
      balance: 6,
      content: 'NFT 민팅',
    },
    {
      id: 3,
      time: '2022.07.03 05:03:14',
      balanceChange: '+2',
      balance: 7,
      content: '후기 참여',
    },
    {
      id: 2,
      time: '2022.07.02 10:34:31',
      balanceChange: '+2',
      balance: 5,
      content: '미팅 확정',
    },
    {
      id: 1,
      time: '2022.07.01 21:33:54',
      balanceChange: '+3',
      balance: 3,
      content: '미팅 참여',
    },
  ];
  const handleWalletSelect = () => {
    setWalletSelected(true);
    setSpendingSelected(false);
    navigation.navigate('WalletOnchainMain');
  };

  const handleSpendingSelect = () => {
    setWalletSelected(false);
    setSpendingSelected(true);
  };

  const goToOffchainRecieve = () => {
    navigation.navigate('WalletOffchainRecieve');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.contentContainer}>
        <View style={styles.buttonWrapper}>
          <WalletCustomButton
            style={styles.buttonWrapper}
            width={140}
            height={50}
            textSize={17}
            margin={[5, 0, 5, 5]}
            text="Spending"
            hasMarginBottom
            onPress={handleSpendingSelect}
            selected={spendingSelected}
          />
          <WalletCustomButton
            style={styles.buttonWrapper}
            width={140}
            height={50}
            textSize={17}
            margin={[5, 5, 5, 0]}
            text="Wallet"
            hasMarginBottom
            onPress={handleWalletSelect}
            selected={walletSelected}
          />
        </View>
        <Text style={styles.accountText}>Token Account</Text>
        <TotalAccountButton amount={10} onPress={goToOffchainRecieve} />
        <Text style={styles.historyText}>History</Text>
        <ScrollView>
          {dummyHistory.map(el => {
            return (
              <HistoryButton
                key={el.id}
                time={el.time}
                balanceChange={el.balanceChange}
                balance={el.balance}
                content={el.content}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
  accountText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  historyText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default WalletOffchainMain;

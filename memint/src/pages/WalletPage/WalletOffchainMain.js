import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';
import WalletCustomButton from '../../components/walletComponents/WalletCustomButton';
import TotalAccountButton from '../../components/walletComponents/TotalAccountButton';
import HistoryButton from '../../components/walletComponents/HistoryButton';
import WalletOffchainHistory from './WalletOffchainHistory';
import WalletOnchainMain from './WalletOnchainMain';
import {subscribeAuth, signOut} from '../../lib/Auth';
import useUser from '../../utils/hooks/UseUser';
import useAuthActions from '../../utils/hooks/UseAuthActions';

function WalletOffchainMain({navigation}) {
  const [walletSelected, setWalletSelected] = useState(false);
  const [spendingSelected, setSpendingSelected] = useState(true);
  const userInfo = useUser();
  const {authorize, logout} = useAuthActions();

  const handleWalletSelect = () => {
    setWalletSelected(true);
    setSpendingSelected(false);
  };

  const handleSpendingSelect = () => {
    setWalletSelected(false);
    setSpendingSelected(true);
  };

  const goToOffchainRecieve = () => {
    navigation.navigate('WalletOffchainRecieve');
  };
  const handleSignOut = useCallback(async () => {
    try {
      logout();
      await signOut();
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate('SignIn');
    }
  }, [navigation, logout]);

  useEffect(() => {
    subscribeAuth(currentUser => {
      if (currentUser) {
        authorize({
          id: currentUser.uid,
          username: currentUser.email,
          displayName: currentUser.displayName,
        });
      } else {
        logout();
      }
    });
  }, [authorize, logout]);
  console.log('@@@WalletOffchainMain Page Re-rendering@@@@');
  console.log(userInfo);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.contentContainer}>
        <View style={styles.buttonWrapper}>
          <BasicButton
            style={styles.button}
            width={70}
            height={35}
            textSize={13}
            margin={[5, 5, 5, 5]}
            text="임시 로그아웃 버튼"
            hasMarginBottom
            onPress={handleSignOut}
          />
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
        {spendingSelected ? (
          <WalletOffchainHistory navigation={navigation} />
        ) : (
          <WalletOnchainMain navigation={navigation} />
        )}
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
    marginTop: 50,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WalletOffchainMain;

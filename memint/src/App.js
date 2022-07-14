import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import WalletPage from './pages/WalletPage/WalletPage';
import Main from './pages/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './pages/AuthPage/SignInScreen';
import SignUpScreen from './pages/AuthPage/SignUpScreen';
import VerifyMobileScreen from './pages/AuthPage/VerifyMobileScreen';
import SignUpUserInfoScreen from './pages/AuthPage/SignUpUserInfoScreen';
import SignUpUserDetailScreen from './pages/AuthPage/SignUpUserDetailScreen';
// import SplashScreen from 'react-native-splash-screen';
const Stack = createNativeStackNavigator();

function App() {
  // useEffect(() => {
  //   try {
  //     console.log('rendering splash');
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 2000);
  //   } catch (e) {
  //     console.wanr('Error occured');
  //     console.warn(e);
  //   }
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyMobile"
          component={VerifyMobileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpUserInfo"
          component={SignUpUserInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpUserDetail"
          component={SignUpUserDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wallet"
          component={WalletPage}
          options={{title: null, headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

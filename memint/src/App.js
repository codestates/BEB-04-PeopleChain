import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// import {configureStore} from 'redux';
import {legacy_createStore as createStore} from 'redux';
import rootReducer from './slices/Index';
import Main from './pages/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ToastProvider} from './context/ToastContext';
import Toast from './components/common/Toast';
import ChattingRoom from './pages/ChattingPage/ChattingRoom';
import {ChatContextProvider} from './components/chattingComponents/context/chatContext';
import SignInScreen from './pages/AuthPage/SignInScreen';
import VerifyMobileScreen from './pages/AuthPage/VerifyMobileScreen';
import SignUpUserInfoScreen from './pages/AuthPage/SignUpUserInfoScreen';
import SignUpUserDetailScreen from './pages/AuthPage/SignUpUserDetailScreen';
import SplashScreen from 'react-native-splash-screen';
import SignUpAgreementScreen from './pages/AuthPage/SignUpAgreement';
import SignUpAlarmScreen from './pages/AuthPage/SignUpAlarmScreen';
import FindIdVerifyMobileScreen from './pages/AuthPage/FindIdVerifyMobileScreen';
import FindIdShowIdScreen from './pages/AuthPage/FindIdShowIdScreen';
import FindPWVerifyScreen from './pages/AuthPage/FindPWVerifyScreen';
import SetNewPWScreen from './pages/AuthPage/SetNewPWScreen';
import WalletOffchainScreen from './pages/WalletPage/WalletOffchainScreen';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

function App() {
  useEffect(() => {
    try {
      console.log('rendering splash');
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    } catch (e) {
      console.wanr('Error occured');
      console.warn(e);
    }
  });

  return (
    <NavigationContainer>
      <Provider store={store}>
        <ToastProvider>
          <ChatContextProvider>
            <Stack.Navigator initialRouteName="SignIn">
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
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
                name="SignUpAgreement"
                component={SignUpAgreementScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SignUpAlarm"
                component={SignUpAlarmScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FindIdVerifyMobile"
                component={FindIdVerifyMobileScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FindIdShowId"
                component={FindIdShowIdScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FindPWVerify"
                component={FindPWVerifyScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SetNewPW"
                component={SetNewPWScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Main"
                component={Main}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="Wallet"
                component={WalletOffchainScreen}
                options={{title: null, headerShown: false}}
              />
              <Stack.Screen
                name="ChattingRoom"
                component={ChattingRoom}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
            <Toast />
          </ChatContextProvider>
        </ToastProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;

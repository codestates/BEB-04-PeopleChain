import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import SignUpScreen from './pages/AuthPage/SignUpScreen';
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
import useUser from './utils/hooks/UseUser';
import useAuthActions from './utils/hooks/UseAuthActions';
import {subscribeAuth} from './lib/Auth';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

function App() {
  const userInfo = useUser();
  const {authorize, logout} = useAuthActions();
  const [initialRouteName, setInitialRouteName] = useState('SignIn');

  const [initializing, setInitializing] = useState(true);
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
  }, []);

  ////////
  useEffect(() => {
    const unsubscribe = subscribeAuth(user => {
      if (user) {
        authorize({
          id: user.uid,
          email: user.email,
        });
        setInitialRouteName('Main');
      } else {
        logout();
        setInitialRouteName('SignIn');
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }
  console.log('@@UseEffect Re-rendering@@@@');
  console.log('currentUser is');
  console.log(userInfo);
  // if (!user) {
  //   console.log('Login Necessary');
  // } else {
  //   console.log('welcome' + user.email);
  // }
  return (
    <NavigationContainer>
      <ToastProvider>
        <ChatContextProvider>
          <Stack.Navigator initialRouteName={initialRouteName}>
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
    </NavigationContainer>
  );
}

export default App;

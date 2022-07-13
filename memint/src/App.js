import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import WalletPage from './pages/WalletPage/WalletPage';
import Main from './pages/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ToastProvider} from './context/ToastContext';
import Toast from './components/common/Toast';
import ChattingRoom from './pages/ChattingPage/ChattingRoom';
import {ChatContextProvider} from './components/chattingComponents/context/chatContext';
import SignInScreen from './pages/SignInPage/SignInScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <ChatContextProvider>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
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

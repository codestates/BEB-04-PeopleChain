import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import WalletPage from './pages/WalletPage/WalletPage';
import Main from './pages/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ToastProvider} from './context/ToastContext';
import Toast from './components/Toast';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <Stack.Navigator initialRouteName="Main">
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
        <Toast />
      </ToastProvider>
    </NavigationContainer>
  );
}

export default App;

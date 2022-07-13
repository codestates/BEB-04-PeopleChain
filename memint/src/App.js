import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import WalletPage from './pages/WalletPage/WalletPage';
import Main from './pages/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './pages/SignInPage/SignInScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

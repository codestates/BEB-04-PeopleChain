import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AlarmPage from './pages/AlarmPage/AlarmPage';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import MeetingPage from './pages/MeetingPage/MeetingPage';
import MyPage from './pages/MyPage/MyPage';
import WalletPage from './pages/WalletPage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Main from './pages/Main';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Wallet" component={WalletPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

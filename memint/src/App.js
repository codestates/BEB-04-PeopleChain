import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AlarmPage from './pages/AlarmPage/AlarmPage';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import MeetingPage from './pages/MeetingPage/MeetingPage';
import MyPage from './pages/MyPage/MyPage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Main from './pages/Main';

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

export default App;

import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MeetingCreate from './MeetingPage/MeetingCreate';
import MeetingDetail from './MeetingPage/MeetingDetail';
import MeetingMarket from './MeetingPage/MeetingMarket';
import AlarmPage from './AlarmPage/AlarmPage';

import MyPage from './MyPage/MyPage';
import ChattingListPage from './ChattingPage/ChattingListPage';
import ChattingRoom from './ChattingPage/ChattingRoom';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Main({navigation}) {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Mypage"
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: '#009688',
          },
          tabBarActiveTintColor: '#009688',
        }}>
        <Tab.Screen
          name="meeting"
          component={MeetingScreen}
          options={{
            tabBarLabel: '홈',
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="alarm"
          component={AlarmScreen}
          options={{
            tabBarLabel: '알림',
            tabBarIcon: ({color}) => (
              <Icon name="notifications" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="chatting"
          component={ChattingScreen}
          options={{
            tabBarLabel: '채팅',
            tabBarIcon: ({color}) => (
              <Icon name="message" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="mypage"
          component={MyPageScreen}
          options={{
            tabBarLabel: '마이페이지',
            tabBarIcon: ({color}) => (
              <Icon name="person" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
      <View style={styles.walletButton}>
        <Button title="wallet" onPress={() => navigation.navigate('Wallet')} />
      </View>
    </>
  );
}

const MyPageScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
};

const MeetingScreen = () => {
  return (
    <Stack.Navigator initialRouteName="MeetingMarket">
      <Stack.Screen name="MeetingMarket" component={MeetingMarket} />
      <Stack.Screen name="MeetingDetail" component={MeetingDetail} />
      <Stack.Screen name="MeetingCreate" component={MeetingCreate} />
    </Stack.Navigator>
  );
};

const ChattingScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="채팅 목록" component={ChattingListPage} />
      <Stack.Screen name="ChattingRoom" component={ChattingRoom} />
    </Stack.Navigator>
  );
};

const AlarmScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AlarmPage" component={AlarmPage} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  walletButton: {
    position: 'absolute',
    width: 80,
    height: 40,
    right: 20,
    bottom: 100,
    backgroundColor: 'black',
    borderRadius: 5,
  },
});

export default Main;

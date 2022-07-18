import React, {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, ScrollView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WalletOffchainMain from './WalletOffchainMain';
import WalletOnchainMain from './WalletOnchainMain';
import {Icon} from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function WalletMain({navigation}) {
  return (
    <>
      <Tab.Navigator
        initialRouteName="WalletOffchain"
        screenOptions={
          {
            //   tabBarIndicatorStyle: {
            //     backgroundColor: '#009688',
            //   },
            //   tabBarActiveTintColor: '#009688',
          }
        }>
        <Tab.Screen
          name="WalletOffchain"
          component={WalletOffchainScreen}
          options={
            {
              // tabBarLabel: 'Home',
              // tabBarIcon: ({color}) => (
              //   <Icon name="home" color={color} size={24} />
              // ),
            }
          }
        />
        <Tab.Screen
          name="WalletOnchain"
          component={WalletOnchainScreen}
          options={
            {
              // tabBarLabel: 'Home',
              // tabBarIcon: ({color}) => (
              //   <Icon name="home" color={color} size={24} />
              // ),
            }
          }
        />
      </Tab.Navigator>
    </>
  );
}

const WalletOffchainScreen = () => {
  return (
    <Stack.Navigator initialRouteName="WalletOffchainMain">
      <Stack.Screen
        name="WalletOffchainMain"
        component={WalletOffchainMain}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const WalletOnchainScreen = () => {
  return (
    <Stack.Navigator initialRouteName="WalletOnchainMain">
      <Stack.Screen
        name="WalletOnchainMain"
        component={WalletOnchainMain}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default WalletMain;

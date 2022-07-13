import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import ChattingList from '../../components/chattingComponents/chattingList';
import dummyData from './dummydata/jsonfile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function ChattingListPage({navigation}) {
  const [chattings, setChattings] = useState(dummyData);
  // 채팅 목록이 없을 경우 미팅에 참여해보세요! <미팅 만들기> <미팅 목록보기> 버튼 렌더링

  return <ChattingList chattings={chattings} navigation={navigation} />;
}

export default ChattingListPage;

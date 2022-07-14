import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import ChattingList from '../../components/chattingComponents/chattingList';
import dummyData from './dummydata/jsonfile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatContext from '../../components/chattingComponents/context/chatContext';

function ChattingListPage({navigation}) {
  // useState로 관리했던 상태를 navigation을 이용하면 props로 주고받기 힘들기 때문에 useContext를 사용하여 더 편하게 관리하기
  // const [chattings, setChattings] = useState(dummyData);
  const {chatLog, setChatLog} = useContext(ChatContext);
  useEffect(() => {
    setChatLog(dummyData);
  });
  // 채팅 목록이 없을 경우 미팅에 참여해보세요! <미팅 만들기> <미팅 목록보기> 버튼 렌더링

  return (
    <ChattingList
      //useContext를 사용하기 때문에 props로 넘겨줄 필요도 없다.
      // chattings={chatLog}
      navigation={navigation}
    />
  );
}

export default ChattingListPage;

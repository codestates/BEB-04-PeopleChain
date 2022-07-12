import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import ChattingList from '../../components/chattingComponents/chattingList';

// 채팅 목록이 없을 경우 미팅에 참여해보세요! <미팅 만들기> <미팅 목록보기> 버튼 렌더링
function ChattingListPage() {
  const [chattings, setChattings] = useState([
    {text: 'Dummy1입니다.', id: 1},
    {text: 'Dummy2입니다.', id: 2},
    {text: 'Dummy3입니다.', id: 3},
    {text: 'Dummy4입니다.', id: 4},
  ]);

  // const ChatList = chatting.map(item => {
  //   return <Chatting text={item.text} />;
  // });

  return (
    <SafeAreaView>
      <ChattingList chattings={chattings} />
    </SafeAreaView>
  );
}

export default ChattingListPage;

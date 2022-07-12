import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import ChattingList from '../../components/chattingComponents/chattingList';

function ChattingListPage({navigation}) {
  const [chattings, setChattings] = useState([
    {
      text: 'hostImage',
      id: 1,
      title: '금요일날 같이 놀아요',
      hostId: '김개똥',
      joinersId: ['김철수', '김영희', '박찬솔'],
    },
    {
      text: 'hostImage',
      id: 2,
      title: '월요일은 월래 취하는날',
      hostId: '김바퀴',
      joinersId: ['똥글이', '삼영이', '영구'],
    },
    {
      text: 'hostImage',
      id: 3,
      title: '평범한 목요일밤~',
      hostId: '최영철',
      joinersId: ['이쿠요잇', '마오쩌둥', '아오뚱뚱'],
    },
    {
      text: 'hostImage',
      id: 4,
      title: '아프지망고 아푸지망고',
      hostId: '망고방고',
      joinersId: ['사방팔방', '질색팔색', '김극혐'],
    },
  ]);
  // 채팅 목록이 없을 경우 미팅에 참여해보세요! <미팅 만들기> <미팅 목록보기> 버튼 렌더링

  return <ChattingList chattings={chattings} navigation={navigation} />;
}

export default ChattingListPage;

import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import Profile from './Profile';
import MyMeeting from './MyMeeting';

function MyPage() {
  const dummyUser = {
    nickName: '김개똥',
    birth: '1997.07.09',
    gender: '여성',
    alcoholQuantity: ['소주 반 병'],
    alcoholType: ['맥주', '와인', '술이라면 다 좋음'],
    alcoholStyle: [
      '일단 마시고 생각하자구요. 부어라 마셔라!',
      '술보다 안주가 더 좋아요.',
    ],
    nftImage:
      'https://lh3.googleusercontent.com/o7U7XfamFNTSn3HrcUWRgtAwracl2ygU_12XarpHIYnfGnOla4zgrRqz0OvLL0-KyYqOJSyp-1YmcdndjjuyThYB_IdLFk5LBoilNus=w600',
    profileImage: 'https://randomuser.me/api/portraits/women/17.jpg',
    myMeMin:
      'https://lh3.googleusercontent.com/aAw8TBIaLoC55VWQjamPt_9iPq_bbJksLuxTTX4WXmQrrJbMXcEBBKR83GtgU_DRTklmpE793TzeXWyCqsFcY-pg4gsHI-7Gah_ipA=w600',
    myNFTs: [
      'https://lh3.googleusercontent.com/-jgMiZOhUs-3hdyDlg7_rPqFf8BhLEGWNlbg_RgqFKPPFnoCum_DfOUkGIPZIKonCbsM0ChJgwSVK36KAXTZAN6ZBPPSB0V_s0Kd=w600',
      'https://lh3.googleusercontent.com/1lEK5t6aQvy_6YaVa0856-Dbtb8yhDYXU5q8ZWhSVGR2PNM397RTgBPsiSkG5nsZ0vM7LDand2dcIBzKOpNnyErv6c5AmXkbnR-B2A=w600',
    ],
    myMeeting: [
      {
        name: '금요일 밤 재미있게 노실 분들 구해요! (훈남 2명)',
        date: '7월 8일 (금)',
        type: ['부어라 마셔라', '술게임 환영'],
        location: '강남',
        peopleNum: 2,
      },
      {
        name: '오빠 차 뽑았다 널 데리러 가',
        date: '7월 8일 (금)',
        type: ['부어라 마셔라', '술게임 환영'],
        location: '송파',
        peopleNum: 2,
      },
    ],
    participatedMeeting: [
      {
        name: '수요일 밤 재미있게 노실 분들 구해요! (훈남 2명)',
        hostName: '김아무개',
        date: '7월 8일 (금)',
        type: ['부어라 마셔라', '술게임 환영'],
        location: '강남',
        peopleNum: 2,
        hostImage: 'https://randomuser.me/api/portraits/men/23.jpg',
        status: 'pending',
      },
      {
        name: '별이 빛나는 아름다운 밤이야이야',
        hostName: '이아무개',
        date: '7월 15일 (금)',
        type: ['분위기있는저녁', '와인한잔어때요?'],
        location: '마포',
        peopleNum: 2,
        hostImage: 'https://randomuser.me/api/portraits/men/84.jpg',
        status: 'accepted',
      },
    ],
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Profile User={dummyUser} />
        <MyMeeting User={dummyUser} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyPage;

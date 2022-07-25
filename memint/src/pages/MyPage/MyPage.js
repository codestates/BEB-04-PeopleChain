import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import BasicButton from '../../components/common/BasicButton';
import MyMeetingList from '../../components/myPageComponent/MyMeetingList';
import ParticipatedMeetingList from '../../components/myPageComponent/ParticipatedMeetingList';
import MyProfile from '../../components/myPageComponent/MyProfle';
import useUser from '../../utils/hooks/UseUser';
import {getOffchainTokenLog} from '../../lib/OffchianTokenLog';
import useOffchainActions from '../../utils/hooks/UseOffchainActions';

function MyPage({navigation}) {
  const user = useUser();
  const {addLog} = useOffchainActions();

  const onSubmitSignIn = async () => {
    const res = await getOffchainTokenLog(user.id);
    const logs = res.docs.map(el => {
      return {...el.data()};
    });
    addLog(logs);
  };

  const dummyUser = {
    nickname: user.nickName,
    birth: user.birth,
    gender: user.gender,
    alcoholQuantity: ['소주 반 병'],
    alcoholType: ['맥주', '와인', '술이라면 다 좋음'],
    alcoholStyle: [
      '일단 마시고 생각하자구요. 부어라 마셔라!',
      '술보다 안주가 더 좋아요.',
    ],
    nftImage:
      'https://lh3.googleusercontent.com/o7U7XfamFNTSn3HrcUWRgtAwracl2ygU_12XarpHIYnfGnOla4zgrRqz0OvLL0-KyYqOJSyp-1YmcdndjjuyThYB_IdLFk5LBoilNus=w600',
    profileImage: user.picture,

    myNfts: [
      {
        id: 1,
        uri: 'https://lh3.googleusercontent.com/-jgMiZOhUs-3hdyDlg7_rPqFf8BhLEGWNlbg_RgqFKPPFnoCum_DfOUkGIPZIKonCbsM0ChJgwSVK36KAXTZAN6ZBPPSB0V_s0Kd=w600',
        valid: true,
        profile: false,
      },
      {
        id: 2,
        uri: 'https://lh3.googleusercontent.com/1lEK5t6aQvy_6YaVa0856-Dbtb8yhDYXU5q8ZWhSVGR2PNM397RTgBPsiSkG5nsZ0vM7LDand2dcIBzKOpNnyErv6c5AmXkbnR-B2A=w600',
        valid: true,
        profile: false,
      },
      {
        id: 3,
        uri: 'https://lh3.googleusercontent.com/o7U7XfamFNTSn3HrcUWRgtAwracl2ygU_12XarpHIYnfGnOla4zgrRqz0OvLL0-KyYqOJSyp-1YmcdndjjuyThYB_IdLFk5LBoilNus=w600',
        valid: true,
        profile: true,
      },
      {
        id: 4,
        uri: 'https://lh3.googleusercontent.com/aAw8TBIaLoC55VWQjamPt_9iPq_bbJksLuxTTX4WXmQrrJbMXcEBBKR83GtgU_DRTklmpE793TzeXWyCqsFcY-pg4gsHI-7Gah_ipA=w600',
        valid: false,
        profile: false,
      },
    ],
    myMeeting: [
      {
        id: 1,
        name: '금요일 밤 재미있게 노실 분들 구해요! (훈남 2명)',
        description: '분위기 잘 맞춰드릴게요 :) 재미있게 놀아봐요~ ',
        date: '7월 8일 (금)',
        type: ['부어라 마셔라', '술게임 환영'],
        location: '강남',
        peopleNum: 2,
        hostSide: {
          sex: '남',
          gathered: ['김개똥', '이개똥'],
        },
        joinerSide: {
          sex: '여',
          gathered: ['박와와'],
        },
      },
      {
        id: 2,
        name: '오빠 차 뽑았다 널 데리러 가',
        description: '분위기 잘 맞춰드릴게요 :) 재미있게 놀아봐요~ ',
        date: '7월 8일 (금)',
        type: ['부어라 마셔라', '술게임 환영'],
        location: '송파',
        peopleNum: 2,
        hostSide: {
          sex: '여',
          gathered: ['김개똥', '이개똥'],
        },
        joinerSide: {
          sex: '남',
          gathered: [],
        },
      },
    ],
    participatedMeeting: [
      {
        id: 1,
        name: '수요일 밤 재미있게 노실 분들 구해요! (훈남 2명)',
        hostName: '김아무개',
        date: '7월 8일 (금)',
        type: ['부어라 마셔라', '술게임 환영'],
        location: '강남',
        peopleNum: 2,
        hostImage: 'https://randomuser.me/api/portraits/men/23.jpg',
        status: 'pending',
        hostSide: {
          sex: '남',
          gathered: ['김아무개', '이아묵'],
        },
        joinerSide: {
          sex: '남',
          gathered: ['최고야', '할로'],
        },
      },
      {
        id: 2,
        name: '별이 빛나는 아름다운 밤이야이야',
        hostName: '이아무개',
        date: '7월 15일 (금)',
        type: ['분위기있는저녁', '와인한잔어때요?'],
        location: '마포',
        peopleNum: 2,
        hostImage: 'https://randomuser.me/api/portraits/men/84.jpg',
        status: 'accepted',
        hostSide: {
          sex: '여',
          gathered: ['이아무개', '안녕'],
        },
        joinerSide: {
          sex: '여',
          gathered: ['배고파'],
        },
      },
    ],
  };

  const [meetingRoom, setMeetingRoom] = useState(0);
  const room = [{name: '내가 만든 방'}, {name: '참여 중인 방'}];
  const selecteMenuHandler = index => {
    setMeetingRoom(index);
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <BasicButton
          text="test"
          width={100}
          height={40}
          textSize={14}
          backgroundColor={'#007aff'}
          margin={[10, 3, 3, 3]}
          onPress={onSubmitSignIn}
        />
        {/* 유저 프로필 */}
        <MyProfile User={dummyUser} navigation={navigation} />
        {/* 탭 선택 버튼 */}
        <View style={styles.meetingButton}>
          {room.map((ele, index, key) => {
            return (
              <BasicButton
                text={ele.name}
                width={100}
                height={40}
                textSize={14}
                backgroundColor={
                  meetingRoom === index ? '#007aff' : 'lightgray'
                }
                margin={[10, 3, 3, 3]}
                onPress={() => selecteMenuHandler(index)}
                key={index}
              />
            );
          })}
        </View>
        {/* 탭 선택에 따른 미팅 리스트 */}

        {meetingRoom === 0 ? (
          <MyMeetingList List={dummyUser.myMeeting} navigation={navigation} />
        ) : (
          <ParticipatedMeetingList List={dummyUser.participatedMeeting} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  meetingButton: {
    marginVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MyPage;

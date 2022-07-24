import React, {useState, useRef, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import ChatText from '../../components/chattingComponents/chatText';
import RoomHeader from '../../components/chattingComponents/roomHeader';
import RoomInfo from '../../components/chattingComponents/roomInfo';
import MyDoubleModal from '../../components/chattingComponents/myDoubleModal';
import ChattingRoomTopTab from '../../components/chattingComponents/ChattingRoomTopTab';
import SpendingModal from '../../components/common/UserInfoModal/SpendingModal';
import MySingleModal from '../../components/chattingComponents/MySingleModal';
import firestore from '@react-native-firebase/firestore';
import {useToast} from '../../utils/hooks/useToast';

const windowWidth = Dimensions.get('window').width;

function ChattingRoom({route}) {
  const animation = useRef(new Animated.Value(1)).current;
  const [roomInfo, setRoomInfo] = useState(false);
  // 처음에 렌더링을 하면 가운데 있던 userinfo 화면이 우측으로 들어가는 것이 보인다.
  // 이를 없애기 위해 우측 상단 햄버거를 클릭하면 그 때 true 값을 주어 컴포넌트 자체가 생성되도록 만들었다.
  // 그런데 이렇게 하면 햄버거를 누를 때마다 setRoomInfoExist에 true 값을 주게 되어 리소스 낭비가 생긴다.
  // 이를 효율적으로 방지할 수 있는 방법은 없을까?
  const [roomInfoExist, setRoomInfoExist] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [roomConfirmation, setRoomConfirmation] = useState(false);
  const [proposeModalVisible, setProposeModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [meetingEnd, setMeetingEnd] = useState(false);
  const [spendingModalVisible, setSpendingModalVisible] = useState(false);
  const [mySingleModalVisible, setMySingleModalVisible] = useState(false);
  const {showToast} = useToast();
  const [userNickName, setUserNickName] = useState('');
  const userRef = useMemo(() => firestore().collection('User'), []);

  useEffect(() => {
    Animated.spring(animation, {
      toValue: roomInfo ? windowWidth / 5 : windowWidth,
      useNativeDriver: true,
      speed: 13,
      bounciness: 0,
    }).start();

    // 아래는 params.data로 받아온 members라는, 참여자의 id값을 통해서 각각 참여자의 nickName을 받아와 객체화하는 과정이다. 결과값은 아래와 같다.
    // {"연습용계정1": "남자", "연습용계정2": "소년", "연습용계정3": "소녀", "연습용계정4": "아저씨"}
    // 이 객체를 userNickName이라는 state에 담아줄 것이고, 그렇게 되면 하위 페이지에서는 state를 받아 userId에 대응하는 알맞은 닉네임을 렌더링해줄 수 있다.
    // asyncStorage를 사용하게 되면 관련 user의 닉네임 들을 저장해놓아 바로 렌더링할 수 있겠지만 지금은 그렇지 못하기때문에 이런 방법을 사용한다.

    const memberNickName = [];
    // 아래 방법에서 만약 Promise.all의 정보 호출이 순서가 맞지 않을 것이 걱정된다면, map을 돌릴 때 한 요소마다 한 번씩 바로 {el : nickName}의 형식으로
    // memberNickName에 push해주고, 이후 reduce 함수를 사용하여 객체를 한번에 모아주는 방식도 고려해볼 수 있다.
    const users = Promise.all(
      route.params.data.members.map(async el => {
        memberNickName.push(Object.keys(el)[0]);
        const result = await userRef.doc(Object.keys(el)[0]).get();
        return result.data().nickName;
      }),
    );
    users
      .then(result => {
        return result.reduce((acc, cur, idx) => {
          // console.log(cur);
          return {...acc, [memberNickName[idx]]: cur};
        }, 0);
      })
      .then(result => setUserNickName(result));
  });
  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{flex: 1}}
      // 키보드가 올라온 상태에서 추가적으로 적용할 +값
      // keyboardVerticalOffset={80}
    >
      <SafeAreaView>
        <RoomHeader
          title={route.params.data.title}
          roomInfo={roomInfo}
          setRoomInfo={setRoomInfo}
          setRoomInfoExist={setRoomInfoExist}
        />
      </SafeAreaView>
      <View style={{flex: 1}}>
        <ChattingRoomTopTab
          isConfirmed={isConfirmed}
          meetingEnd={meetingEnd}
          setProposeModalVisible={setProposeModalVisible}
          setModalVisible={setModalVisible}
        />
        <ChatText
          data={route.params.data}
          roomINfo={roomInfo}
          userNickName={userNickName}
        />

        {roomInfoExist ? (
          <Animated.View
            style={[styles.roomInfo, {transform: [{translateX: animation}]}]}>
            <RoomInfo
              chatInfo={route.params.data}
              setModalVisible={setModalVisible}
              setIsHost={setIsHost}
              confirmation={confirmation}
              setMeetingEnd={setMeetingEnd}
            />
          </Animated.View>
        ) : null}

        <MyDoubleModal
          body={
            <>
              <Text style={{marginTop: 7}}>
                {isHost
                  ? '미팅 개최를 확정하시겠습니까?'
                  : '미팅 참가를 확정하시겠습니까?'}
              </Text>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={{marginTop: 7}}>🗓 날짜: 2022년 7월 8일 (월)</Text>
                <Text style={{marginTop: 7}}>
                  ⏰ 시간 : 2022년 7월 15일 (토)
                </Text>
                <Text style={{marginTop: 7}}>🏖 장소 : 강남역</Text>
              </View>
            </>
          }
          nButtonText="아니요"
          pButtonText="네"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setIsConfirmed={setIsConfirmed}
          setSpendingModalVisible={setSpendingModalVisible}
        />
        <SpendingModal
          spendingModalVisible={spendingModalVisible}
          setSpendingModalVisible={setSpendingModalVisible}
          setMySingleModalVisible={setMySingleModalVisible}
          pFunction={() => {
            setSpendingModalVisible(false);
            setMySingleModalVisible(true);
          }}
        />
        <MySingleModal
          text="LCN이 차감되었습니다!"
          buttonText="확인"
          modalVisible={mySingleModalVisible}
          setModalVisible={setMySingleModalVisible}
          pFunction={() => {
            setMySingleModalVisible(false);
            showToast('basic', '확정되었습니다!');
            setIsConfirmed(true);
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  roomInfo: {
    backgroundColor: 'white',
    position: 'absolute',
    width: (windowWidth / 5) * 4,
    height: '100%',
  },
  headerRapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#007aff',
  },
  tabView: {
    container: {
      height: 90,
      borderTopWidth: 0.3,
      padding: 15,
      flexDirection: 'row',
    },
    status: {
      height: 20,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
    },
    button: {
      width: 70,
      height: 40,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export default ChattingRoom;

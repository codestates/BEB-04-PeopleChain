import React, {useState, useRef, useEffect} from 'react';
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

  useEffect(() => {
    Animated.spring(animation, {
      toValue: roomInfo ? windowWidth / 5 : windowWidth,
      useNativeDriver: true,
      speed: 13,
      bounciness: 0,
    }).start();
  }, [roomInfo, animation]);

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{flex: 1}}
      // 키보드가 올라온 상태에서 추가적으로 적용할 +값
      // keyboardVerticalOffset={80}
    >
      <SafeAreaView>
        <RoomHeader
          title={route.params.item.title}
          roomInfo={roomInfo}
          setRoomInfo={setRoomInfo}
          setRoomInfoExist={setRoomInfoExist}
        />
      </SafeAreaView>

      <View style={{flex: 1, flexDirection: 'row'}}>
        <ChatText chat={route.params.item.chat} roomInfo={roomInfo} />
        {roomInfoExist ? (
          <Animated.View
            style={[styles.roomInfo, {transform: [{translateX: animation}]}]}>
            <RoomInfo
              chatInfo={route.params.item}
              setModalVisible={setModalVisible}
              setIsHost={setIsHost}
              confirmation={confirmation}
              roomConfirmation={roomConfirmation}
            />
            <MyDoubleModal
              body={
                <>
                  <Text style={{marginTop: 7}}>
                    {isHost
                      ? '미팅 개최를 확정하시겠습니까?'
                      : '미팅 참가를 확정하시겠습니까?'}
                  </Text>
                  <View style={{alignItems: 'flex-start'}}>
                    <Text style={{marginTop: 7}}>
                      🗓 날짜: 2022년 7월 8일 (월)
                    </Text>
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
              pFunction={() => {
                {
                  isHost ? setRoomConfirmation(false) : setConfirmation(true);
                  setModalVisible(false);
                }
              }}
            />
          </Animated.View>
        ) : null}
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
});

export default ChattingRoom;

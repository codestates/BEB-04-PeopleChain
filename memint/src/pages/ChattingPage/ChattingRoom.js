import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import ChatText from '../../components/chattingComponents/chatText';
import RoomHeader from '../../components/chattingComponents/roomHeader';
import RoomInfo from '../../components/chattingComponents/roomInfo';

const windowWidth = Dimensions.get('window').width;

function ChattingRoom({route}) {
  const animation = useRef(new Animated.Value(1)).current;
  const [roomInfo, setRoomInfo] = useState(false);
  // 처음에 렌더링을 하면 가운데 있던 userinfo 화면이 우측으로 들어가는 것이 보인다.
  // 이를 없애기 위해 우측 상단 햄버거를 클릭하면 그 때 true 값을 주어 컴포넌트 자체가 생성되도록 만들었다.
  // 그런데 이렇게 하면 햄버거를 누를 때마다 setRoomInfoExist에 true 값을 주게 되어 리소스 낭비가 생긴다.
  // 이를 효율적으로 방지할 수 있는 방법은 없을까?
  const [roomInfoExist, setRoomInfoExist] = useState(false);
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
            <RoomInfo chatInfo={route.params.item} />
          </Animated.View>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

// function RoomHeader({title, roomInfo, setRoomInfo}) {
//   const navigation = useNavigation();
//   return (
//     <View style={styles.headerRapper}>
//       <TouchableOpacity
//         style={{flexDirection: 'row'}}
//         onPress={() => navigation.pop()}>
//         <Icon name="arrow-back-ios" size={20} color={'#007aff'} />
//         <Text style={styles.buttonText}>목록</Text>
//       </TouchableOpacity>
//       <Text style={{fontWeight: 'bold', fontSize: 18}}>{title}</Text>
//       <TouchableOpacity onPress={() => setRoomInfo(!roomInfo)}>
//         <Icon name="menu" size={30} color="green" style={{marginRight: 10}} />
//       </TouchableOpacity>
//     </View>
//   );
// }

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

import React, {useEffect, useState, useMemo} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AddChat from './addChat';
import UserInfoModal from '../common/UserInfoModal';
import firestore from '@react-native-firebase/firestore';
import useUser from '../../utils/hooks/UseUser';
import LinearGradient from 'react-native-linear-gradient';
import InquireUserProfile from '../common/InquireUserProfile';

function ChatText({data, roomInfo, userNickName, userImages}) {
  // const [chats, setChats] = useState(chattings);
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [chattings, setChattings] = useState('');
  const userDesc = useUser();
  const user = userDesc.id;

  const chatRef = useMemo(
    () => firestore().collection('Meeting').doc(data.id).collection('Messages'),
    [data.id],
  );

  useEffect(() => {
    const getContent = async () => {
      chatRef.orderBy('createdAt').onSnapshot(result => {
        if (result.docs.length === 0) {
          return;
        } else if (
          result.docChanges()[result.docChanges().length - 1].doc._data
            .createdAt
        ) {
          setChattings(result.docs);
        }
      });
    };
    getContent();
  }, [chatRef]);

  return (
    <View style={roomInfo ? {flex: 1, opacity: 0.8} : {flex: 1}}>
      <LinearGradient
        colors={['#A7BFEB', '#FBC2EA']}
        style={roomInfo ? {flex: 1, opacity: 0.8} : {flex: 1}}>
        <FlatList
          // horizontal={true}
          // 플랫리스트에서 하단부터 렌더링을 해주는 설정
          inverted={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            flexDirection: 'column-reverse',
          }}
          // initialScrollIndex={0}
          style={styles.container}
          data={chattings}
          renderItem={({item}) =>
            item.data().sender === user ? (
              <MyChat item={item} userNickName={userNickName} user={userDesc} />
            ) : (
              <NotMyChat
                userNickName={userNickName}
                item={item}
                setUserInfoModalVisible={setUserInfoModalVisible}
                setUserInfo={setUserInfo}
                userImages={userImages}
              />
            )
          }
        />
        <UserInfoModal
          userInfo={userInfo}
          nButtonText="아니오"
          pButtonText="네"
          userInfoModalVisible={userInfoModalVisible}
          setUserInfoModalVisible={setUserInfoModalVisible}
        />
      </LinearGradient>
      <AddChat chatId={data.id} />
    </View>
  );
}

function NotMyChat({
  item,
  setUserInfoModalVisible,
  setUserInfo,
  userNickName,
  userImages,
}) {
  return (
    <View style={styles.messageWrapper}>
      {/* 클릭할 시 유저 정보를 열겠냐고 물어보는 모달 창 띄우는 값 true로 설정 */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // 1. redux에 저장된 data의 visibleUser list에 해당 유저의 아이디가 있는지 확인한다.
          // 2. 있다면 사진을 렌더링, 없다면 spendingModal을 띄운다.
          // 3. 토큰을 차감하고 visibleUser list에 해당 아이디를 추가해준다.
          setUserInfoModalVisible(true);
          setUserInfo(item.sender);
        }}>
        <InquireUserProfile
          width={60}
          height={60}
          margin={[10, 3, 3, 3]}
          userId={item.data().sender}
        />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text style={styles.senderName}>
          {userNickName[item.data().sender]}
        </Text>
        <View style={styles.messageBody}>
          <Text style={{padding: 3}}>{item.data().text}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={{marginBottom: 7, fontSize: 10, color: 'gray'}}>
          {item
            .data()
            .createdAt.toDate()
            .toLocaleString()
            .slice(
              6,
              item.data().createdAt.toDate().toLocaleString().length - 3,
            )}
        </Text>
      </View>
    </View>
  );
}

function MyChat({item, userNickName}) {
  return (
    <View style={styles.MymessageWrapper}>
      {/* <Image source={{uri: user.picture}} style={styles.image} /> */}
      <View style={[styles.textWrapper, {alignItems: 'flex-end'}]}>
        <Text style={styles.senderName}>
          {userNickName[item.data().sender]}
        </Text>
        <View style={[styles.messageBody, {backgroundColor: 'white'}]}>
          <Text style={{padding: 3}}>{item.data().text}</Text>
        </View>
      </View>
      <View style={styles.date}>
        <Text style={{marginBottom: 7, fontSize: 10, color: 'gray'}}>
          {item
            .data()
            .createdAt.toDate()
            .toLocaleString()
            .slice(
              6,
              item.data().createdAt.toDate().toLocaleString().length - 3,
            )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  messageWrapper: {
    flexDirection: 'row',
    width: '60%',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: 'gray',
    marginRight: 7,
    marginLeft: 7,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  senderName: {
    marginTop: 10,
    paddingBottom: 6,
    fontSize: 15,
    fontWeight: 'bold',
  },
  messageBody: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 3,
    width: 'auto',
    height: 'auto',
  },
  date: {
    justifyContent: 'flex-end',
    marginRight: 7,
    marginLeft: 7,
  },
  MymessageWrapper: {
    flexDirection: 'row-reverse',
    width: '60%',
    marginLeft: 'auto',
    marginBottom: 10,
    right: 10,
  },
});

export default ChatText;

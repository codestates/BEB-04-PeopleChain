import React, {useContext, useReducer, useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatContext from './context/chatContext';

// props로 채팅방의 아이디를 받아온다.
function AddChat({chats, setChats}) {
  const user = '김영희';
  // useContext로 전체 chatLog와 변경할 수 있는 state를 받아온다.
  // const {chatLog, setChatLog} = useContext(ChatContext);

  // 받아온 chatLog에서 id로 filter하여 현재 위치해있는 방의 정보만 가져와서 state로 저장한다.
  // const [thisChat, setThisChat] = useState(
  //   chatLog.filter(el => el.id === chatId),
  // );

  // TextInput에 담긴 값을 text라는 state로 저장한다.
  const [text, setText] = useState('');
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="메시지를 입력하세요"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity>
        <Icon
          name="send"
          size={30}
          color="blue"
          onPress={() => {
            const tempchats = [...chats].concat({
              createdAt: '2022-07-14',
              body: text,
              sender: user,
            });
            setChats(tempchats);
            setText('');
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    paddingHorizontal: 16,
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 6,
  },
  input: {
    width: '90%',
    flexWrap: 'wrap',
    fontSize: 17,
    paddingVertical: 8,
  },
});

export default AddChat;

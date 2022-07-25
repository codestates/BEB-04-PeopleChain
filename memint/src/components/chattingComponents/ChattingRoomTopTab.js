import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../../utils/hooks/useToast';
import firestore from '@react-native-firebase/firestore';
const user = '연습용계정2';

function ChattingRoomTopTab({setProposeModalVisible, setModalVisible, data}) {
  const meetingRef = useMemo(() => {
    return firestore().collection('Meeting').doc(data.id);
  }, [data]);

  const [roomData, setRoomData] = useState('');
  const [count, setCount] = useState('');

  useEffect(() => {
    meetingRef.onSnapshot(result => {
      console.log(result.data());
      setRoomData(result.data());
      const memberStatusCount = result.data().members.filter(el => {
        return Object.values(el)[0] === 'accepted';
      }).length;

      setCount(memberStatusCount);
    });
  }, [meetingRef]);

  return user === data.hostId ? (
    <Host
      data={roomData}
      count={count}
      setProposeModalVisible={setProposeModalVisible}
      setModalVisible={setModalVisible}
    />
  ) : (
    <Joiner
      data={roomData}
      count={count}
      setProposeModalVisible={setProposeModalVisible}
      setModalVisible={setModalVisible}
    />
  );
}

const Host = ({data, count, setProposeModalVisible, setModalVisible}) => {
  const {showToast} = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    console.log(data.status);
    console.log(count);
  }, [data, count]);
  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{paddingRight: 7}}>{data.title}</Text>
            <View
              style={
                // status가 fixed이면
                data.status === 'full'
                  ? {...styles.status, backgroundColor: 'gray'} // 아니면 회색 view 렌더링
                  : styles.status // 파란색 view 렌더링
              }>
              <Text style={{color: 'black'}}>확정</Text>
            </View>
          </View>
        </View>
        <Text style={{marginTop: 20}}>미팅 정보 보러가기 ></Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {
          //status가 end이면
          data.status === 'end' ? (
            <TouchableOpacity
              onPress={() => {
                // proposeModal이 왜 렌더링이 안되는지 모르겠다. 파일 변경이 있었던 것 같다.
                // setProposeModalVisible(true);
                navigation.navigate('FeedbackChoicePage');
              }}>
              <View style={styles.button}>
                <Text>후기 작성</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={
                data.status === 'fixed'
                  ? () => {
                      showToast(
                        'error',
                        '후기 작성은 미팅 완료 후 가능합니다.',
                      );
                    }
                  : () => {
                      count === 1 ? setModalVisible(true) : null;
                    }
              }>
              <View
                style={
                  //'나를 제외한 모든 사람이 fixed가 아니면?'
                  count !== 1
                    ? {...styles.button, backgroundColor: 'gray'}
                    : // 나를 제외한 모든 사람이 fixed인데 status가 full이면?
                    data.status === 'full'
                    ? styles.button
                    : // 나를 제외한 모든 사람이 fixed이고 status가 fixed이면?
                      {...styles.button, backgroundColor: 'gray'}
                }>
                <Text style={{color: 'black'}}>
                  {
                    //'status가 full이면'
                    data.status === 'full' ? '확정하기' : '후기 작성하기'
                  }
                </Text>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
};

const Joiner = ({data, count, setProposeModalVisible, setModalVisible}) => {
  const {showToast} = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    console.log(data.status);
    console.log(count);
  }, [data]);
  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{paddingRight: 7}}>{data.title}</Text>
            <View
              style={
                // status가 fixed이면
                data.status === 'full'
                  ? {...styles.status, backgroundColor: 'gray'} // 아니면 회색 view 렌더링
                  : styles.status // 파란색 view 렌더링
              }>
              <Text style={{color: 'black'}}>확정</Text>
            </View>
          </View>
        </View>
        <Text style={{marginTop: 20}}>미팅 정보 보러가기 ></Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {
          //status가 end이면
          data.status === 'end' ? (
            <TouchableOpacity
              onPress={() => {
                // proposeModal이 왜 렌더링이 안되는지 모르겠다. 파일 변경이 있었던 것 같다.
                // setProposeModalVisible(true);
                navigation.navigate('FeedbackChoicePage');
              }}>
              <View style={styles.button}>
                <Text>후기 작성</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={
                data.status === 'full'
                  ? () => {
                      data.members?.filter(el => {
                        return el[user] === 'fixed';
                      }).length === 1
                        ? showToast(
                            'error',
                            '후기 작성은 미팅 완료 후 가능합니다.',
                          )
                        : setModalVisible(true);
                    }
                  : () => {
                      showToast(
                        'error',
                        '후기 작성은 미팅 완료 후 가능합니다.',
                      );
                    }
              }>
              <View
                style={
                  data.members?.filter(el => {
                    return el[user] === 'fixed';
                  }).length === 1
                    ? {...styles.button, backgroundColor: 'gray'}
                    : styles.button
                }>
                <Text style={{color: 'black'}}>
                  {data.members?.filter(el => {
                    return el[user] === 'fixed';
                  }).length === 1
                    ? '후기 작성하기'
                    : '확정하기'}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderTopWidth: 0.3,
    padding: 15,
    flexDirection: 'row',
    // position: 'absolute',
    // backgroundColor: '',
  },
  status: {
    height: 20,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  button: {
    width: 90,
    height: 40,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChattingRoomTopTab;

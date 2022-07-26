import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';
import {useMeeting} from '../../utils/hooks/UseMeeting';
import {handleDateInFormat} from '../../utils/common/Functions';
import {updateMeeting} from '../../lib/Meeting';
import useMeetingActions from '../../utils/hooks/UseMeetingActions';

// function MyMeetingList({List, navigation}) {
//   return (
//     <>
//       <FlatList
//         data={List}
//         renderItem={({item}) => (
//           <MyMeetings item={item} navigation={navigation} />
//         )}
//       />
//     </>
//   );
// }

function MyMeetingList({navigation, user}) {
  const meetingData = useMeeting(); //redux crete, join에 있는 모든 미팅 정보들
  const [createdRoom, setCreatedRoom] = useState([]);

  useEffect(() => {
    setCreatedRoom(
      user.createdroomId?.map(el => {
        //내가 가지고 있는 아이디
        const meetingInfo = meetingData.filter(meeting => {
          return meeting.id === el;
        });
        return meetingInfo[0];
      }),
    );
  }, [meetingData, user]);
  return (
    <>
      {createdRoom ? (
        createdRoom.map((el, index) => (
          <MyMeetings item={el} navigation={navigation} key={index} />
        ))
      ) : (
        <Text>생성한 미팅이 없습니다.</Text>
      )}
    </>
  );
}
function MyMeetings({item, navigation}) {
  const [editModal, setEditModal] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [endModal, setEndModal] = useState(false);
  const meetings = useMeeting();
  const {saveMeeting} = useMeetingActions();
  const renderButton = () => {
    if (item.status === 'fixed') {
      return (
        <TouchableOpacity
          style={{
            ...styles.deleteButton,
            ...styles.backgroundColorBlue,
          }}
          onPress={() => setStartModal(true)}>
          <Text style={styles.buttonText}>미팅 시작하기</Text>
        </TouchableOpacity>
      );
    } else if (item.status === 'confirmed') {
      return (
        <TouchableOpacity
          style={{
            ...styles.deleteButton,
            ...styles.backgroundColorBlue,
          }}
          onPress={() => setEndModal(true)}>
          <Text style={styles.buttonText}>미팅 끝내기</Text>
        </TouchableOpacity>
      );
    } else if (item.status === 'end') {
      return <Text>종료된 미팅</Text>;
    }
  };

  const handleMeetingStart = () => {
    //서버에 요청
    updateMeeting(item.id, {status: 'confirmed'});
    //redux
    const updateData = meetings.map(el => {
      if (el.id !== item.id) {
        return el;
      } else {
        return {...el, status: 'confirmed'};
      }
    });
    saveMeeting(updateData);
  };
  const handleMeetingEnd = () => {
    //서버에 요청
    updateMeeting(item.id, {status: 'end'});
    const updateData = meetings.map(el => {
      if (el.id !== item.id) {
        return el;
      } else {
        return {...el, status: 'end'};
      }
    });
    saveMeeting(updateData);
  };
  return (
    <>
      <View style={styles.meetingCard}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity
            style={{
              ...styles.deleteButton,
              ...styles.backgroundColorBlue,
            }}
            onPress={() => {
              navigation.navigate('ChattingRoom', {data: item});
            }}>
            <Text style={styles.buttonText}>채팅방 이동하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {item?.meetingTags.map((type, index) => {
            return (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagFont}># {type}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.container}>
          <Text style={styles.details}>{item?.region}</Text>
          <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
          <Text style={styles.details}>
            {handleDateInFormat(item?.meetDate)}
          </Text>
          <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
          <Text>{item?.peopleNum + ':' + item?.peopleNum}</Text>
        </View>

        <View style={[styles.container, styles.spaceBetween]}>
          <TouchableOpacity
            style={{
              ...styles.deleteButton,
              ...styles.backgroundColorBlue,
            }}
            onPress={() => setEditModal(true)}>
            <Text style={styles.buttonText}>미팅 정보 수정</Text>
          </TouchableOpacity>
          {renderButton()}
        </View>

        <DoubleModal
          text="미팅 정보를 수정하시겠어요?"
          nButtonText="아니오"
          pButtonText="네"
          modalVisible={editModal}
          setModalVisible={setEditModal}
          pFunction={() => {
            setEditModal(false);
            navigation.navigate('EditMeetingInfo', {
              item: {
                ...item,
                meetDate: item.meetDate.toDate().toISOString(),
              },
            });
          }}
          nFunction={() => {
            setEditModal(false);
          }}
        />
        <DoubleModal
          text="미팅이 시작되었나요?"
          nButtonText="아니오"
          pButtonText="네"
          modalVisible={startModal}
          setModalVisible={setStartModal}
          pFunction={() => {
            setStartModal(false);
            //earnModal 띄우기
            //earnModal 후에는 status 변경
            handleMeetingStart();
          }}
          nFunction={() => {
            setStartModal(false);
          }}
        />
        <DoubleModal
          text="미팅을 종료하시겠습니까?"
          nButtonText="아니오"
          pButtonText="네"
          modalVisible={endModal}
          setModalVisible={setEndModal}
          pFunction={() => {
            setEndModal(false);
            //earnModal 띄우기
            handleMeetingEnd();
          }}
          nFunction={() => {
            setEndModal(false);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
  },
  meetingCard: {
    backgroundColor: 'white',
    marginVertical: '2%',
    paddingVertical: '3%',
    paddingHorizontal: '10%',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    paddingVertical: '3%',
  },

  details: {
    fontSize: 13,
  },
  divider: {
    transform: [{rotate: '90deg'}],
    marginHorizontal: -3,
  },

  deleteButton: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#DA6262',
    width: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },
  tag: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    borderRadius: 5,
    backgroundColor: '#E6E6E6',
    alignSelf: 'flex-start',
    marginRight: '1%',
  },
  tagFont: {
    fontSize: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  backgroundColorBlue: {
    backgroundColor: 'blue',
  },
});

export default MyMeetingList;

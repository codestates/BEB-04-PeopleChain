import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';
import {handleISOtoLocale} from '../../utils/common/Functions';
import {useMeeting} from '../../utils/hooks/UseMeeting';
import {useToast} from '../../utils/hooks/useToast';

// function ParticipatedMeetingList({List}) {
//   return (
//     <>
//       <FlatList
//         data={List}
//         renderItem={({item}) => <ParticipatedMeetings item={item} />}
//       />
//     </>
//   );
// }
function ParticipatedMeetingList({user}) {
  const meetingData = useMeeting();
  const [joinedRoom, setJoinedRoom] = useState([]);
  useEffect(() => {
    setJoinedRoom(
      user.joinedroomId?.map(el => {
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
      {joinedRoom ? (
        joinedRoom.map((el, index) => (
          <ParticipatedMeetings item={el} key={index} />
        ))
      ) : (
        <Text>참여 중인 미팅이 없습니다.</Text>
      )}
    </>
  );
}

function ParticipatedMeetings({item}) {
  const navigation = useNavigation();
  const [cancelModal, setCancelModal] = useState(false);
  const {showToast} = useToast();
  return (
    <>
      <View style={styles.meetingCard}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.container}>
          {item.meetingTags.map((tag, index) => {
            return (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagFont}># {tag}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            ...styles.container,
            ...styles.spaceBetween,
          }}>
          {/* <View style={styles.container}>
            <Image
              style={styles.hostImage}
              source={{
                uri: item.hostImage,
              }}
            />
            <Text style={styles.hostName}>{item.hostId}</Text>
          </View> */}
          <View style={styles.container}>
            <Text style={styles.details}>{item.region}</Text>
            <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
            <Text style={styles.details}>
              {handleISOtoLocale(item.meetDate)}
            </Text>
            <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
            {/* <Text
              style={[
                styles.details,
                item.peopleNum === item.hostSide.gathered.length
                  ? styles.title
                  : '',
              ]}>
              {item.peopleNum}({item.hostSide.sex}):
            </Text>
            <Text
              style={[
                styles.details,
                item.peopleNum === item.joinerSide.gathered.length
                  ? styles.title
                  : '',
              ]}>
              {item.joinerSide.gathered.length}({item.joinerSide.sex})
            </Text> */}
            <Text>{item.peopleNum + ':' + item.peopleNum}</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.container,
            ...styles.spaceBetween,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text>상태: </Text>
            <Text style={{fontWeight: 'bold', marginRight: 10}}>
              {item.status === 'pending' ? '대기 중' : '참여 완료'}
            </Text>

            {/* 참가신청 취소 / 채팅방 이동 버튼 */}
          </View>
          {item.status === 'pending' ? (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setCancelModal(true)}>
              <Text style={styles.buttonText}>참가신청 취소하기</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                ...styles.cancelButton,
                ...styles.backgroundColorBlue,
              }}
              onPress={() => {
                navigation.navigate('ChattingRoom', {data: item});
              }}>
              <Text style={styles.buttonText}>채팅방 이동하기</Text>
            </TouchableOpacity>
          )}
        </View>
        <DoubleModal
          text="미팅 참가신청을 취소하시겠어요?"
          nButtonText="네"
          pButtonText="아니오"
          modalVisible={cancelModal}
          setModalVisible={setCancelModal}
          nFunction={() => {
            setCancelModal(false);
            showToast('success', '취소되었습니다');
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
  hostImage: {
    width: 20,
    height: 20,
    borderRadius: 100,
    position: 'relative',
  },
  title: {
    fontWeight: '700',
    paddingVertical: '3%',
  },
  hostName: {
    fontWeight: '500',
    color: 'gray',
    marginLeft: 5,
  },
  details: {
    fontSize: 13,
  },
  divider: {
    transform: [{rotate: '90deg'}],
    marginHorizontal: -3,
  },
  cancelButton: {
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

export default ParticipatedMeetingList;

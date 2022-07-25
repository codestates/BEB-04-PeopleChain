import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';
import {useMeeting} from '../../utils/hooks/UseMeeting';
import {handleISOtoLocale} from '../../utils/common/Functions';

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
      {createdRoom?.map((el, index) => (
        <MyMeetings item={el} navigation={navigation} key={index} />
      ))}
    </>
  );
}
function MyMeetings({item, navigation}) {
  const [editModal, setEditModal] = useState(false);
  return (
    <>
      <View style={styles.meetingCard}>
        <Text style={styles.title}>{item?.title}</Text>
        <View style={styles.container}>
          {item?.meetingTags.map((type, index) => {
            return (
              <View style={styles.tag} key={index}>
                <Text style={styles.tagFont}># {type}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            ...styles.container,
            ...styles.spaceBetween,
          }}>
          <View style={styles.container}>
            <TouchableOpacity
              style={{
                ...styles.deleteButton,
                ...styles.backgroundColorBlue,
              }}
              onPress={() => setEditModal(true)}>
              <Text style={styles.buttonText}>미팅 정보 수정</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                ...styles.deleteButton,
              }}
              onPress={() => setDeleteModal(true)}>
              <Text style={styles.buttonText}>미팅룸 삭제</Text>
            </TouchableOpacity> */}
          </View>

          <DoubleModal
            text="미팅 정보를 수정하시겠어요?"
            nButtonText="아니오"
            pButtonText="네"
            modalVisible={editModal}
            setModalVisible={setEditModal}
            pFunction={() => {
              setEditModal(false);
              navigation.navigate('EditMeetingInfo', {item});
            }}
            nFunction={() => {
              setEditModal(false);
            }}
          />
          <View style={styles.container}>
            <Text style={styles.details}>{item?.region}</Text>
            <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
            <Text style={styles.details}>
              {handleISOtoLocale(item?.meetDate)}
            </Text>
            <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
            {/* <Text
              style={[
                styles.details,
                item.peopleNum === item.hostSide.gathered.length
                  ? styles.title
                  : '',
              ]}>
              {item.peopleNum}({'일단 생략'}):
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
            <Text>{item?.peopleNum + ':' + item?.peopleNum}</Text>
          </View>
        </View>
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
    paddingHorizontal: 10,
    marginHorizontal: 2,
    backgroundColor: '#DA6262',
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

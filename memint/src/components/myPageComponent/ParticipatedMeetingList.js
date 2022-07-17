import React, {useState} from 'react';
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

function ParticipatedMeetingList({List}) {
  return (
    <>
      <FlatList
        data={List}
        renderItem={({item}) => <ParticipatedMeetings item={item} />}
      />
    </>
  );
}

function ParticipatedMeetings({item}) {
  const [cancelModal, setCancelModal] = useState(false);
  return (
    <>
      <View style={styles.meetingCard}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.container}>
          {item.type.map(type => {
            return (
              <>
                <View style={styles.tag}>
                  <Text style={styles.tagFont}># {type}</Text>
                </View>
              </>
            );
          })}
        </View>
        <View
          style={{
            ...styles.container,
            justifyContent: 'space-between',
          }}>
          <View style={styles.container}>
            <Image
              style={styles.hostImage}
              source={{
                uri: item.hostImage,
              }}
            />
            <Text style={styles.hostName}>{item.hostName}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.details}>{item.location}</Text>
            <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
            <Text style={styles.details}>{item.date}</Text>
            <Icon name={'horizontal-rule'} size={20} style={styles.divider} />
            <Text
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
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.container,
            justifyContent: 'space-between',
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
                backgroundColor: '#007aff',
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
          pFunction={() => {
            setCancelModal;
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
});

export default ParticipatedMeetingList;

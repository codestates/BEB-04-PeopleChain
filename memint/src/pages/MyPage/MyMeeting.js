import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';

function MyMeeting({User}) {
  const [meetingRoom, setMeetingRoom] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const room = [
    {name: '내가 만든 방', content: User.myMeeting},
    {name: '참여 중인 방', content: User.participatedMeeting},
  ];

  const selecteMenuHandler = index => {
    setMeetingRoom(index);
  };
  return (
    <>
      {/* 탭 선택 버튼 */}
      <View style={styles.meetingButton}>
        {room.map((ele, index) => {
          return (
            <BasicButton
              text={ele.name}
              size="medium"
              variant={meetingRoom === index ? 'basic' : 'disable'}
              onPress={() => selecteMenuHandler(index)}
            />
          );
        })}
      </View>

      {/* 미팅 리스트 */}
      <View>
        {room[meetingRoom].content.map(ele => {
          return (
            <>
              <View style={styles.meetingCard}>
                <Text style={styles.title}>{ele.name}</Text>
                <View style={styles.container}>
                  {ele.type.map(type => {
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
                  {/* 호스트 정보 or 미팅 정보 수정 버튼*/}
                  {meetingRoom === 1 ? (
                    <View style={styles.container}>
                      <Image
                        style={styles.hostImage}
                        source={{
                          uri: ele.hostImage,
                        }}
                      />
                      <Text style={styles.hostName}>{ele.hostName}</Text>
                    </View>
                  ) : (
                    <View style={styles.container}>
                      <TouchableOpacity
                        style={{
                          ...styles.deleteButton,
                          backgroundColor: '#007aff',
                        }}
                        onPress={() => setEditModal(true)}>
                        <Text style={styles.buttonText}>미팅 정보 수정</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...styles.deleteButton,
                        }}
                        onPress={() => setDeleteModal(true)}>
                        <Text style={styles.buttonText}>미팅룸 삭제</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <DoubleModal
                    text="미팅룸 삭제 후 복구가 불가합니다. 삭제하시겠습니까?"
                    nButtonText="네"
                    pButtonText="아니오"
                    modalVisible={deleteModal}
                    setModalVisible={setDeleteModal}
                    pFunction={() => {
                      setDeleteModal;
                    }}
                  />
                  <DoubleModal
                    text="미팅 정보를 수정하시겠어요?"
                    nButtonText="네"
                    pButtonText="아니오"
                    modalVisible={editModal}
                    setModalVisible={setEditModal}
                    pFunction={() => {
                      setDeleteModal;
                    }}
                  />

                  {/* 미팅 세부 정보 */}
                  <View style={styles.container}>
                    <Text style={styles.details}>{ele.location}</Text>
                    <Icon
                      name={'horizontal-rule'}
                      size={20}
                      style={styles.divider}
                    />
                    <Text style={styles.details}>{ele.date}</Text>
                    <Icon
                      name={'horizontal-rule'}
                      size={20}
                      style={styles.divider}
                    />
                    <Text style={styles.details}>
                      {ele.peopleNum}:{ele.peopleNum}
                    </Text>
                  </View>
                </View>

                {/* 수락 or 대기 상태 */}
                {meetingRoom === 1 ? (
                  <View
                    style={{
                      ...styles.container,
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text>상태: </Text>
                      <Text style={{fontWeight: 'bold', marginRight: 10}}>
                        {ele.status === 'pending' ? '대기 중' : '참여 완료'}
                      </Text>

                      {/* 참가신청 취소 / 채팅방 이동 버튼 */}
                    </View>
                    {ele.status === 'pending' ? (
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
                ) : null}
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
        })}
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
  meetingButton: {
    marginVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default MyMeeting;

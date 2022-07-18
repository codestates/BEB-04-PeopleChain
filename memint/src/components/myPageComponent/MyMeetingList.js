import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {useToast} from '../../utils/hooks/useToast';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DoubleModal from '../../components/common/DoubleModal';

function MyMeetingList({List, navigation}) {
  return (
    <>
      <FlatList
        data={List}
        renderItem={({item}) => (
          <MyMeetings item={item} navigation={navigation} />
        )}
      />
    </>
  );
}

function MyMeetings({item, navigation}) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const {showToast} = useToast();
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
            <TouchableOpacity
              style={{
                ...styles.deleteButton,
                backgroundColor: '#007aff',
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
            text="미팅룸 삭제 후 복구가 불가합니다. 삭제하시겠습니까?"
            nButtonText="네"
            pButtonText="아니오"
            modalVisible={deleteModal}
            setModalVisible={setDeleteModal}
            nFunction={() => {
              setDeleteModal(false);
              showToast('success', '삭제되었습니다.');
            }}
          />
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
          />
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
});

export default MyMeetingList;

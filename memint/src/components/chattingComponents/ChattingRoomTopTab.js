import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../../utils/hooks/useToast';

function ChattingRoomTopTab({
  isConfirmed,
  meetingEnd,
  setProposeModalVisible,
  setModalVisible,
}) {
  const navigation = useNavigation();
  const {showToast} = useToast();

  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>금요일 밤 재미있게 노실 분들 구해요 </Text>
            <View
              style={
                isConfirmed
                  ? styles.status
                  : {...styles.status, backgroundColor: 'gray'}
              }>
              <Text style={{color: isConfirmed ? 'white' : 'black'}}>확정</Text>
            </View>
          </View>
        </View>
        <Text style={{marginTop: 20}}>미팅 정보 보러가기 ></Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {meetingEnd ? (
          <TouchableOpacity
            onPress={() => {
              setProposeModalVisible(true);
              navigation.navigate('FeedbackChoicePage');
            }}>
            <View style={styles.button}>
              <Text style={{color: 'white'}}>후기 작성</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              isConfirmed
                ? showToast('error', '후기 작성은 미팅 완료 후 가능합니다.')
                : setModalVisible(true);
            }}>
            <View
              style={
                isConfirmed
                  ? {...styles.button, backgroundColor: 'gray'}
                  : styles.button
              }>
              <Text style={{color: isConfirmed ? 'black' : 'white'}}>
                {isConfirmed ? '후기 작성' : '확정하기'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderTopWidth: 0.3,
    padding: 15,
    flexDirection: 'row',
    // position: 'absolute',
    // backgroundColor: 'white',
  },
  status: {
    height: 20,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  button: {
    width: 70,
    height: 40,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChattingRoomTopTab;

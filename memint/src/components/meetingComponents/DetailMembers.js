import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function DetailMembers({membersInfo, peopleNum}) {
  const currentPeopleNum = () => {
    //2 ->2:2 현재 1:0
    if (membersInfo.length > peopleNum) {
      return peopleNum + ':' + (membersInfo.length - peopleNum);
    } else {
      return membersInfo.length + ':' + 0;
    }
  };
  return (
    <View style={styles.memberBox}>
      <View style={styles.memberBoxInfo}>
        <Text style={styles.boldFont}>현재 모인 멤버</Text>
        <View style={styles.memberBoxInfopeopleNum}>
          <Text style={styles.boldFont}>{currentPeopleNum()}</Text>
          <Text style={styles.grayFont}>{`(${peopleNum}:${peopleNum})`}</Text>
        </View>
      </View>
      <View style={styles.memberList}>
        {membersInfo.map((member, idx) => (
          <View key={idx} style={styles.memberInfo}>
            <View style={styles.memberInfoProfile}>
              <Icon name="help" size={50} color={'gray'} />
            </View>
            <View>
              <Text style={styles.memberInfoContentEl}>{member.nickname}</Text>
              <View style={styles.memberGenderAge}>
                <Text style={styles.memberInfoContentEl}>{member.gender}</Text>
                <Text style={styles.memberInfoContentEl}>{member.birth}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  memberBox: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
  },
  memberBoxInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  memberList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  memberBoxInfopeopleNum: {
    flexDirection: 'row',
  },
  memberInfo: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  memberGenderAge: {
    flexDirection: 'row',
  },
  memberInfoContentEl: {
    margin: 5,
  },
  boldFont: {
    fontWeight: 'bold',
  },
  grayFont: {
    color: 'gray',
  },
});

export default DetailMembers;

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {handleBirth} from '../../utils/common/Functions';

function DetailMembers({membersInfo, peopleNum, hostId}) {
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
        <Text style={styles.title}>현재 모인 멤버</Text>
        <View style={styles.memberBoxInfopeopleNum}>
          <Text style={styles.currentPeopleNum}>{currentPeopleNum()}</Text>
          <Text style={styles.peopleNum}>{`(${peopleNum}:${peopleNum})`}</Text>
        </View>
      </View>
      <View style={styles.memberList}>
        {membersInfo.map((member, idx) => (
          <View key={idx} style={styles.memberInfo}>
            <View style={styles.memberInfoProfile}>
              <Image
                source={{uri: member.nftProfile}}
                style={styles.userImage}
              />
            </View>
            <View>
              <Text style={styles.memberInfoNickName}>{member.nickName}</Text>
              <View style={styles.memberGenderAge}>
                <Text style={styles.memberInfoContentEl}>
                  {handleBirth(member.birth)}
                </Text>
                <Text
                  style={styles.memberInfoContentEl}>{`(${member.gender?.slice(
                  0,
                  1,
                )})`}</Text>
              </View>
            </View>
          </View>
        ))}
        {membersInfo.peopleNum * 2 > membersInfo.length ? '' : ''}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  memberBox: {
    backgroundColor: 'white',
    paddingVertical: 23,
    paddingHorizontal: 32,
    marginVertical: 10,
    marginHorizontal: 3,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
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
  memberInfoNickName: {
    margin: 5,
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    color: 'black',
  },
  currentPeopleNum: {
    fontWeight: '500',
  },
  peopleNum: {
    fontWeight: '500',
    color: 'black',
  },
  image: {
    width: 40,
    height: 40,
  },
  hostCrown: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  userImage: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
});

export default DetailMembers;

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {handleBirth} from '../../utils/common/Functions';
import crown from '../../assets/icons/crown.png';

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
              {member.id === hostId ? (
                <View style={styles.hostCrown}>
                  <Image
                    source={crown}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                ''
              )}
              <Image
                source={{uri: member.nftProfile}}
                style={styles.userImage}
              />
            </View>
            <View>
              <Text style={styles.memberInfoContentEl}>{member.nickName}</Text>
              <View style={styles.memberGenderAge}>
                <Text style={styles.memberInfoContentEl}>{member.gender}</Text>
                <Text style={styles.memberInfoContentEl}>
                  {handleBirth(member.birth)}
                </Text>
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

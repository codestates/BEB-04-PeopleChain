import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyNFT from './MyNFT';
import {useNftProfile} from '../../utils/hooks/UseNft';

function MyProfile({User, navigation}) {
  console.log(User);
  const nftProfile = useNftProfile();

  return (
    <>
      <View style={{alignItems: 'flex-end'}}>
        <Icon
          name="edit"
          size={30}
          style={styles.edit}
          onPress={() => navigation.navigate('EditMyInfo')}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.images}>
          <Image
            style={styles.nftImage}
            source={{
              uri: nftProfile
                ? nftProfile.nftImg
                : 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360',
            }}
          />
          <Image
            style={styles.profileImage}
            source={{
              uri: User.profileImage,
            }}
          />
          <Image
            source={require('../../assets/icons/nftBadge.png')}
            style={styles.badge}
          />
        </View>
        <View style={styles.userInfos}>
          <Text style={styles.userInfo}>닉네임: {User.nickName}</Text>
          <Text style={styles.userInfo}>생년월일: {User.birth}</Text>
          <Text style={styles.userInfo}>성별: {User.gender}</Text>
        </View>
      </View>
      <MyNFT User={User} />
      <Text style={styles.attribute}>주량</Text>
      <View style={styles.tagContainer}>
        {User.alcoholQuantity.map((el, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tagFont}># {el}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.attribute}>선호 주류</Text>
      <View style={styles.tagContainer}>
        {User.alcoholType.map((el, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tagFont}># {el}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.attribute}>스타일</Text>
      <View style={styles.tagContainer}>
        {User.alcoholStyle.map((el, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tagFont}># {el}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  edit: {
    top: 20,
    left: -10,
  },
  container: {
    flexDirection: 'row',
  },
  images: {
    flex: 0.4,
    marginHorizontal: '5%',
    marginVertical: '0%',
  },
  nftImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    top: 35,
    left: 15,
    position: 'relative',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    top: 0,
    left: 95,
    position: 'relative',
  },

  userInfos: {
    marginVertical: '10%',
    flex: 0.6,
  },
  userInfo: {
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  attribute: {
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: '10%',
    marginVertical: '2%',
  },

  mintButton: {
    top: -30,
    left: 60,
    paddingBottom: 0,
  },

  tag: {
    paddingHorizontal: '2%',
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginVertical: '2%',
    marginBottom: 6,
  },
  tagContainer: {
    flexDirection: 'row',
    marginHorizontal: '10%',
    flexWrap: 'wrap',
  },
  tagFont: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 13,
  },
  badge: {
    width: 35,
    height: 35,
    marginRight: -20,
    top: 28,
    left: 15,
    position: 'absolute',
  },
});

export default MyProfile;

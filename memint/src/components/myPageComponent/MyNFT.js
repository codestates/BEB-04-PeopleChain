import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, FlatList} from 'react-native';
import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SingleModal from '../../components/common/SingleModal';
import SpendingModal from '../common/UserInfoModal/SpendingModal';
import {useToast} from '../../utils/hooks/useToast';
import {filterMemin} from '../../lib/NFT';
import {getUser} from '../../lib/Users';

function MyNFT({User}) {
  const [showNFT, setShowNFT] = useState(false);

  const [meminImgUrl, setMeminImgUrl] = useState(null);

  // useEffect(() => {
  //   getUser(userUID).then(setUser);
  //   filterMemin(userUID).then(setMeminImgUrl);
  // }, [userUID]);

  // console.log(user);
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.attribute}>나의 미민이</Text>
      </View>
      <MyMeMin myMeMin={User.myNfts[User.myNfts.length - 1]} />
      <View style={{...styles.container, justifyContent: 'space-between'}}>
        <Text style={styles.attribute}>나의 NFT</Text>
        <Icon
          name="arrow-drop-down"
          size={40}
          onPress={() => setShowNFT(!showNFT)}
          style={[styles.dropDown, showNFT ? styles.rotate180 : '']}
        />
      </View>

      {showNFT ? (
        <View style={styles.myNFTs}>
          {/* <FlatList
            data={User.myNfts}
            renderItem={({item}) => <MyNFTs item={item} />}
            numColumns="5"
          /> */}
          {User.myNfts.map((ele, key) => (
            <MyNFTs item={ele} key={ele.id} />
          ))}
        </View>
      ) : null}
    </>
  );
}

function MyMeMin({myMeMin}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [spendingModalVisible, setSpendingModalVisible] = useState(false);
  const {showToast} = useToast();

  return (
    <>
      <View style={{height: 90}}>
        <Image
          style={styles.myMeMin}
          source={{
            uri: myMeMin.uri,
          }}
        />
        {myMeMin.valid ? (
          <View style={{marginLeft: 40}}>
            <Image
              source={require('../../assets/icons/nftBadge.png')}
              style={{...styles.badge, left: 0, top: -75}}
            />
          </View>
        ) : (
          <View style={styles.mintButton}>
            <BasicButton
              text="민팅하기"
              width={50}
              height={20}
              textSize={10}
              backgroundColor="#007aff"
              margin={[10, 3, 3, 3]}
              onPress={() => setModalVisible(true)}
            />
            <SingleModal
              text="프로필을 NFT로 민팅하시겠습니까?"
              buttonText="민팅하기"
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              pFunction={() => {
                setModalVisible(false);
                setSpendingModalVisible(true);
              }}
            />

            <SpendingModal
              body={<Text>정말로?</Text>}
              nButtonText="아니요"
              pButtonText="네"
              spendingModalVisible={spendingModalVisible}
              setSpendingModalVisible={setSpendingModalVisible}
              pFunction={() => {
                setSpendingModalVisible(false);
                showToast('success', '민팅이 되었습니다');
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}

function MyNFTs({item}) {
  const [changeProfileModalVisible, setChangeProfileModalVisible] =
    useState(false);
  const {showToast} = useToast();
  return (
    <>
      {item.valid ? (
        <>
          <Image
            style={[styles.nft, item.profile ? styles.currentProfileNft : '']}
            source={{uri: item.uri}}
            onPress={() => setChangeProfileModalVisible(true)}
          />

          <Image
            source={require('../../assets/icons/nftBadge.png')}
            style={styles.badge}
          />
        </>
      ) : (
        ''
      )}
      {/* <SingleModal
        text="프로필로 설정하시겠습니까?"
        buttonText="네"
        modalVisible={changeProfileModalVisible}
        setModalVisible={setChangeProfileModalVisible}
        pFunction={() => {
          setChangeProfileModalVisible(false);
          showToast('success', '프로필 변경이 완료되었습니다.');
        }}
      /> */}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  images: {
    flex: 0.4,
    marginHorizontal: '5%',
    marginVertical: '0%',
  },

  myMeMin: {
    width: 60,
    height: 60,
    borderRadius: 100,
    top: 0,
    left: 40,
    marginVertical: '3%',
    position: 'relative',
  },
  badge: {
    width: 20,
    height: 20,
    marginRight: -20,
    top: 0,
    left: -60,
    position: 'relative',
  },
  nft: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: '1%',
    marginBottom: '3%',
  },
  currentProfileNft: {
    borderColor: '#007aff',
    borderWidth: 3,
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
  dropDown: {
    marginRight: 25,
  },
  rotate180: {
    transform: [{rotate: '180deg'}],
  },
  myNFTs: {
    flexDirection: 'row',
    marginLeft: 40,
  },
});

export default MyNFT;

import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, FlatList} from 'react-native';
import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SingleModal from '../../components/common/SingleModal';
import SpendingModal from '../common/UserInfoModal/SpendingModal';
import {useToast} from '../../utils/hooks/useToast';

function MyNFT({User}) {
  const [showNFT, setShowNFT] = useState(false);

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
        <View style={{marginLeft: 40}}>
          <FlatList
            data={User.myNfts}
            renderItem={({item}) => <MyNFTs item={item} />}
            numColumns="5"
          />
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

        <View style={styles.mintButton}>
          <BasicButton
            text="민팅하기"
            size="xSmall"
            variant="basic"
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
      </View>
    </>
  );
}

function MyNFTs({item}) {
  return (
    <>
      {item.valid ? (
        <>
          <Image
            style={[styles.nft, item.profile ? styles.currentProfileNft : '']}
            source={{uri: item.uri}}
          />
          <Image
            source={require('../../Images/nftBadge.png')}
            style={styles.badge}
          />
        </>
      ) : (
        ''
      )}
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
});

export default MyNFT;

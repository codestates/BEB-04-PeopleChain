import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import BasicButton from '../../components/common/BasicButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SingleModal from '../../components/common/SingleModal';
import SpendingModal from '../common/UserInfoModal/SpendingModal';
import {useToast} from '../../utils/hooks/useToast';

function MyNFT({User}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [showNFT, setShowNFT] = useState(false);
  const [spendingModalVisible, setSpendingModalVisible] = useState(false);
  const {showToast} = useToast();
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.attribute}>나의 미민이</Text>
      </View>
      <View style={{height: 90}}>
        <Image
          style={styles.myMeMin}
          source={{
            uri: User.myMeMin,
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
        <View style={{...styles.container, marginLeft: 35}}>
          {User.myNFTs.map(ele => (
            <Image style={styles.nft} source={{uri: ele}} />
          ))}
        </View>
      ) : null}
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
  nft: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: '1%',
    marginBottom: '3%',
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

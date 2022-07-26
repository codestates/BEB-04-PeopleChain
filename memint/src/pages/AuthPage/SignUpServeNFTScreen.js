import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/common/BackButton';
import BasicButton from '../../components/common/BasicButton';

import {createNFT, getImgUrl} from '../../lib/NFT';
import useNftActions from '../../utils/hooks/UseNftActions';
import {useNftProfile} from '../../utils/hooks/UseNft';
import {ActivityIndicator} from 'react-native-paper';
import {createUserNFT} from '../../lib/Users';

const SignUpServeNFTScreen = ({navigation: {navigate}, route}) => {
  const [loading, setLoading] = useState();
  const {setNftProfile} = useNftActions();
  const [profileImg, setProfileImg] = useState('');

  const getNFT = async () => {
    try {
      const nftProfileImg = await getImgUrl();

      setProfileImg(nftProfileImg);
    } catch (e) {
      Alert.alert('실패');
      console.log(e);
    }
  };
  useEffect(() => {
    getNFT();
  }, []);

  const {nickName, uid} = route.params;
  //   console.log(nickName);
  //   console.log(uid);
  //   console.log(profileImg);

  const onSubmit = async () => {
    try {
      const res = await createNFT({userId: uid, nftImg: profileImg});
      const newNFTId = res._documentPath._parts[1];
      setNftProfile(profileImg);
      createUserNFT({userId: uid, nftProfile: profileImg, nftId: newNFTId});
    } catch (e) {
      Alert.alert('실패');
      console.log(e);
    } finally {
      setLoading(false);
      navigate('SignUpAgreement');
    }
  };

  return (
    <SafeAreaView style={styles.fullscreen}>
      <BackButton />
      <View style={styles.fullscreenSub}>
        <Text style={styles.textMain}>
          {nickName}님만을 위한 프로필 이미지 입니다.
        </Text>
        {profileImg ? (
          <Image style={styles.nftImg} source={{uri: profileImg}} />
        ) : (
          <ActivityIndicator sixe="large" color="black" />
        )}

        <BasicButton
          style={styles.button}
          width={300}
          height={40}
          textSize={17}
          margin={[5, 5, 5, 5]}
          text="다음 단계"
          hasMarginBottom
          onPress={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nftImg: {
    width: 300,
    height: 300,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  fullscreen: {
    flex: 1,
  },
  fullscreenSub: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    // height: '50',
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
  },
  formAllAgree: {
    marginTop: 20,
    marginBottom: 32,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formText: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
  },
  textAllAgree: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  textMain: {
    marginBottom: 20,
    paddingHorizontal: 6,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSub: {
    paddingHorizontal: 6,
    fontSize: 14,
    // fontWeight: 'bold',
    // margin: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  contentText: {
    fontSize: 12,
    marginHorizontal: 50,
    paddingHorizontal: 30,
    // marginTop: 30,
  },
  contentTextSub: {
    fontSize: 18,
    margin: 8,
  },
  contentTextVerify: {
    fontSize: 18,
    marginTop: 20,
  },
  tagsContainer: {
    flexWrap: 'wrap',
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
  secondForm: {
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    margin: 50,
  },
  dropdown: {
    fontSize: 10,
    width: 130,
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 30,
  },
});

export default SignUpServeNFTScreen;
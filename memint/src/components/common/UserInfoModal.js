import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import BasicButton from './BasicButton';
import SpendingModal from './UserInfoModal/SpendingModal';
import AskSpendingModal from './UserInfoModal/AskSpendingModal';
import MySingleModal from '../chattingComponents/MySingleModal';
import {ActivityIndicator} from 'react-native-paper';

/*
사용할 컴포넌트에서 state 사용이 필요함.
  const [userInfoModalVisible, setUserInfoModalVisible] = useState(false);

      <UserInfoModal
        body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="네"
        userInfoModalVisible={userInfoModalVisible}
        setUserInfoModalVisible={setUserInfoModalVisible}
        pFunction={() => {}}
      />
 */

function UserInfoModal({user, userInfoModalVisible, setUserInfoModalVisible}) {
  const [spendingModalVisible, setSpendingModalVisible] = useState(false);
  const [askSpendingModalVisible, setAskSpendingModalVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [mySingleModalVisible, setMySingleModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={userInfoModalVisible}>
        <View style={[styles.centeredView, styles.backgroudDim]}>
          <View style={styles.modalView}>
            {user ? (
              <View style={styles.userInfoWrapper}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setAskSpendingModalVisible(true);
                    }}>
                    <View style={styles.images} />

                    <View style={styles.imageLarge}>
                      <Image
                        style={styles.imageLarge}
                        source={{uri: user.nftProfile}}
                      />
                      <View
                        style={
                          isValid === true
                            ? styles.imageSmall
                            : {...styles.imageSmall, height: 0, width: 0}
                        }
                      />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{marginLeft: 13, justifyContent: 'space-around'}}>
                    <Text>이름 : {user.nickName}</Text>
                    <Text>나이 : {user.birth}</Text>
                    <Text>성별 : {user.gender}</Text>
                  </View>
                </View>
                <Text style={styles.hilightText}>주량</Text>
                <View style={styles.tags}>
                  <View style={styles.tag}>
                    <Text>{user.drinkCapa}</Text>
                  </View>
                </View>
                <Text style={styles.hilightText}>선호 주류</Text>
                <View style={styles.tags}>
                  {user ? (
                    user.alcoholType.map((ele, index) => {
                      return (
                        <View style={styles.tag}>
                          <Text>#{ele}</Text>
                        </View>
                      );
                    })
                  ) : (
                    <ActivityIndicator size="large" color="black" />
                  )}

                  {/* <View style={styles.tag}>
                  <Text>#양주</Text>
                </View>
                <View style={styles.tag}>
                  <Text>#맥주</Text>
                </View>
                <View style={styles.tag}>
                  <Text>#와인</Text>
                </View>
                <View style={styles.tag}>
                  <Text>#막걸리</Text>
                </View> */}
                </View>
                <Text style={styles.hilightText}>스타일</Text>
                <View style={styles.tags}>
                  {user.drinkStyle.map((ele, index) => {
                    return (
                      <View style={styles.tag} key={index}>
                        <Text>#{ele}</Text>
                      </View>
                    );
                  })}
                  {/* <View style={styles.tag}>
                  <Text>#부어라 마셔라!</Text>
                </View>
                <View style={styles.tag}>
                  <Text>#아프지 망고!</Text>
                </View>
                <View style={styles.tag}>
                  <Text>#오 필승 코리아!!</Text>
                </View> */}
                </View>
              </View>
            ) : (
              <ActivityIndicator size="large" color="black" />
            )}

            <View style={styles.buttonRow}>
              <BasicButton
                text="닫기"
                size="large"
                variant="basic"
                onPress={() => setUserInfoModalVisible(!userInfoModalVisible)}
              />
            </View>
          </View>
        </View>
        <AskSpendingModal
          nButtonText="아니오"
          pButtonText="네"
          askSpendingModalVisible={askSpendingModalVisible}
          setAskSpendingModalVisible={setAskSpendingModalVisible}
          pFunction={() => {
            setAskSpendingModalVisible(false);
            setSpendingModalVisible(true);
          }}
        />
        <SpendingModal
          nButtonText="취소"
          pButtonText="확인"
          spendingModalVisible={spendingModalVisible}
          setSpendingModalVisible={setSpendingModalVisible}
          pFunction={() => {
            setSpendingModalVisible(false);
            setIsValid(true);
          }}
          amount={1}
          txType="프로필 조회"
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: 300,
    height: 550,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
  },
  userInfoWrapper: {
    height: '90%',
    width: '100%',
  },
  modalText: {
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center',
  },
  backgroudDim: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  buttonRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  images: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'orange',
  },
  imageLarge: {
    position: 'absolute',
    height: 80,
    width: 80,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  imageSmall: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'green',
  },
  hilightText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'lightgray',
    padding: 3,
    borderRadius: 5,
    marginTop: 7,
    marginRight: 10,
  },
});
export default UserInfoModal;

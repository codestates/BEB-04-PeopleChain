import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import BasicButton from '../../components/common/BasicButton';
import {useNavigation} from '@react-navigation/native';
import ConfirmModal from '../../components/chattingComponents/feedback/ConfirmModal';
const person = require('./dummydata/images/person.png');

function FeedbackChoicePage({setChoiceModalVisible, setFeedbackModalVisible}) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  return (
    <View style={[styles.centeredView, styles.backgroudDim]}>
      <Text>김개똥님 외 3명과의 미팅은 어떠셨나요?</Text>
      <View style={styles.modalView}>
        <Text>후기를 남길 미팅 상대를 선택해 주세요.</Text>
        <Human
          name="김개똥"
          setChoiceModalVisible={setChoiceModalVisible}
          setFeedbackModalVisible={setFeedbackModalVisible}
        />
        <Human
          name="김영희"
          setChoiceModalVisible={setChoiceModalVisible}
          setFeedbackModalVisible={setFeedbackModalVisible}
        />
        <Human
          name="서상훈"
          color="#007aff"
          text="선택"
          setChoiceModalVisible={setChoiceModalVisible}
          setFeedbackModalVisible={setFeedbackModalVisible}
        />
        <Human
          name="안젤리"
          setChoiceModalVisible={setChoiceModalVisible}
          setFeedbackModalVisible={setFeedbackModalVisible}
        />
        <BasicButton
          text="후기 보내기"
          size="large"
          onPress={() => {
            setConfirmModalVisible(true);
          }}
        />
        <ConfirmModal
          confirmModalVisible={confirmModalVisible}
          setConfirmModalVisible={setConfirmModalVisible}
        />
      </View>
    </View>
  );
}

function Human({name, color, text}) {
  const navigation = useNavigation();
  const [style, setStyle] = useState(text);
  const [state, setState] = useState(color);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        width: 300,
      }}>
      <View>
        <Image source={person} style={{width: 40, height: 40}} />
        <Text>{name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FeedbackSendPage');
          setStyle('완료');
          setState('gray');
        }}>
        <View
          style={
            color ? [styles.button, {backgroundColor: state}] : styles.button
          }>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            {text ? style : '완료'}
          </Text>
        </View>
      </TouchableOpacity>
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
    width: 350,
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
    height: 470,
    // position: 'absolute',
  },
  modalText: {
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center',
  },
  backgroudDim: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedbackChoicePage;

import React, {useState} from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import SingleModal from '../../components/SingleModal';

function MyPage() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <Text>MyPage 입니다.</Text>
      <Button title="모달" onPress={() => setModalVisible(true)} />
      <SingleModal
        text="미팅을 생성하시겠습니까????"
        //body={<Text>정말로?</Text>}
        buttonText="아니요"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pFunction={setModalVisible}
      />
    </SafeAreaView>
  );
}

export default MyPage;

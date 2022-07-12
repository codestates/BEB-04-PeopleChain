import React, {useState} from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import DoubleModal from '../../components/DoubleModal';

function MeetingPage() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <Text>MeetingPage 입니다.</Text>
      <Button title="모달" onPress={() => setModalVisible(true)} />

      <DoubleModal
        text="미팅을 생성하시겠습니까?"
        //body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="네"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pFunction={() => {}}
      />
    </SafeAreaView>
  );
}

export default MeetingPage;
//미팅 페이지에 예시로 만들기

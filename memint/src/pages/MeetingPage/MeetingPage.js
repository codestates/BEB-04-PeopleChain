import React, {useState} from 'react';
import {View, Text, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

function MeetingPage() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView>
      <Text>MeetingPage 입니다.</Text>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        <Text>modal on</Text>
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              backgroundColor: '#26a59a',
              borderRadius: 24,
            }}>
            <Text>modal off</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

export default MeetingPage;

import React from 'react';
import {View, Modal, StyleSheet, Text} from 'react-native';
import BasicButton from './BasicButton';

/*
사용할 컴포넌트에서 state 사용이 필요함.
  const [spendModalVisible, setSpendModalVisible] = useState(false);

      <SpendingModal
        body={<Text>정말로?</Text>}
        nButtonText="아니요"
        pButtonText="네"
        spendingModalVisible={spendingModalVisible}
        setSpendingModalVisible={setSpendingModalVisible}
        pFunction={() => {}}
      />
 */

function SpendingModal({
  text,
  body,
  pButtonText,
  nButtonText,
  spendingModalVisible,
  setSpendingModalVisible,
  pFunction,
}) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={spendingModalVisible}>
        <View style={[styles.centeredView, styles.backgroudDim]}>
          <View style={styles.modalView}>
            <View
              style={{
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View style={styles.calcText}>
                <Text style={{fontWeight: 'bold'}}>현재 보유 LNC</Text>
                <Text style={{fontWeight: 'bold'}}>10개</Text>
              </View>
              <View style={styles.calcText}>
                <Text style={{fontWeight: 'bold'}}>필요 LNC</Text>
                <Text style={{fontWeight: 'bold'}}>1개</Text>
              </View>
              <View style={styles.calcText}>
                <Text style={{fontWeight: 'bold'}}>차감 후 LNC</Text>
                <Text style={{fontWeight: 'bold'}}>9개</Text>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <BasicButton
                text={nButtonText}
                size="small"
                variant="disable"
                onPress={() => setSpendingModalVisible(!spendingModalVisible)}
              />
              <BasicButton
                text={pButtonText}
                size="small"
                onPress={pFunction}
              />
            </View>
          </View>
        </View>
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
  calcText: {
    flexDirection: 'row',
    marginBottom: 7,
    width: '100%',
    justifyContent: 'space-between',
  },
});
export default SpendingModal;

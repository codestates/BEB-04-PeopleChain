import React from 'react';
import {View, Modal, StyleSheet, Text} from 'react-native';
import BasicButton from '../BasicButton';
import useUser from '../../../utils/hooks/UseUser';
import useAuthActions from '../../../utils/hooks/UseAuthActions';
import {createSpendOffTxLg} from '../../../lib/OffchianTokenLog';
import {updateTokenAmount} from '../../../lib/Users';
/*
사용할 컴포넌트에서 state 사용이 필요함.
  const [spendModalVisible, setSpendModalVisible] = useState(false);

      <SpendingModal
        spendingModalVisible={spendingModalVisible}
        setSpendingModalVisible={setSpendingModalVisible}
        pFunction={}
        amount={1}
        txType='프로필조회'
      />
 */

function SpendingModal({
  spendingModalVisible,
  setSpendingModalVisible,
  pFunction,
  amount,
  txType,
}) {
  const user = useUser();
  const {decreaseBy} = useAuthActions();
  const transactionMade = () => {
    //사용자의 TokenAmount 양 바꿈 (redux 정보 바꿈)
    decreaseBy(amount);
    //TokenLog 생성
    createSpendOffTxLg(user.id, amount, txType, user.tokenAmount);
    //token 변화 firebase에 저장
    // updateTokenAmount(user.id, user.tokenAmount);
    pFunction;
    setSpendingModalVisible(false);
  };
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
                <Text style={{fontWeight: 'bold'}}>현재 보유 LCN</Text>
                <Text style={{fontWeight: 'bold'}}>{user.tokenAmount}</Text>
              </View>
              <View style={styles.calcText}>
                <Text style={{fontWeight: 'bold'}}>필요 LCN</Text>
                <Text style={{fontWeight: 'bold'}}>{amount}개</Text>
              </View>
              <View style={styles.calcText}>
                <Text style={{fontWeight: 'bold'}}>차감 후 LCN</Text>
                <Text style={{fontWeight: 'bold'}}>
                  {user.tokenAmount - amount}개
                </Text>
              </View>
            </View>
            <View style={styles.buttonRow}>
              <BasicButton
                text="아니오"
                size="small"
                variant="disable"
                onPress={() => setSpendingModalVisible(false)}
              />
              <BasicButton
                text="네"
                size="small"
                onPress={() => {
                  pFunction();
                  transactionMade();
                }}
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

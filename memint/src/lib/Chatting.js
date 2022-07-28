import firestore from '@react-native-firebase/firestore';
import useUser from '../utils/hooks/UseUser';
const meetingCollection = firestore().collection('Meeting');

const user = useUser();

// userId를 받아 본인의 status를 fixed로 바꿔주는 함수
// 통째로 바꿔주는 것 밖에는 답이 없는것인가..
export const changeJoinerState = async (meetingId, userId, setModalVisible) => {
  return await meetingCollection
    .doc(meetingId)
    .get()
    .then(result => {
      return result.data().members.map(el => {
        return el[userId] ? {[userId]: 'fixed'} : el;
      });
    })
    .then(result => {
      meetingCollection.doc(meetingId).update({
        members: result,
      }),
        setModalVisible(false);
      return 'runModal';
    });
};

// meeintgId를 받아 Meeting의 status를 fixed로 바꿔주는 함수
// spendingModal에서 토큰 차감이 완료된 후에 실행되어야한다.
export const changeMeetingState = async meetingId => {
  return await meetingCollection.doc(meetingId).update({
    status: 'fixed',
  });
};

export const isVisible = userId => {
  if (user.visibleUser) {
    user.visibleUser.forEach(el => {
      if (el === userId) return true;
    });
  }
  return false;
};

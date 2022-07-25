import firestore from '@react-native-firebase/firestore';

export const NFTCollection = firestore().collection('NFT');

export async function getOffchainTokenLog(userId) {
  const offchainTokenLog = await firestore()
    .collection('User')
    .doc(userId)
    .collection('OffchainTokenLog')
    .get();

  return offchainTokenLog;
}

export function createSpendOffTxLg(userId, amount, txType, balance) {
  return firestore()
    .collection('User')
    .doc(userId)
    .collection('OffchainTokenLog')
    .add({
      amount,
      txType,
      createdAt: firestore.FieldValue.serverTimestamp(),
      from: userId,
      to: 'serverId',
      balance,
    });
}

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

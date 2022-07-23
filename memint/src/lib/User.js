import firestore from '@react-native-firebase/firestore';

export const UserCollection = firestore().collection('User');

export async function getNFTs(userId) {
  const doc = await UserCollection.doc(userId).get();

  return doc.data().nftIds;
}

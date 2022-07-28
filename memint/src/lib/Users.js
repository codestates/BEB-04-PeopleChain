import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('User');

export function createUser({
  userId,
  nickName,
  gender,
  birth,
  picture,
  address,
  privateKey,
}) {
  // return usersCollection.doc(id).get();
  // console.log(usersCollection);
  return usersCollection.doc(userId).set({
    userId,
    nickName,
    gender,
    birth,
    createdAt: firestore.FieldValue.serverTimestamp(),
    picture,
    nftProfile: null,
    nftIds: [],
    address: null,
    privateKey: null,
    tokenAmount: 0,
    createdroomId: [],
    joinedroomId: [],
    ethAmount: 0,
    onChainTokenAmount: 0,
  });
}

export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}

export async function getUserProperty(id) {
  const doc = await usersCollection.doc(id).collection('Property').get();
  const property = doc.docs.map(doc => doc.data());

  return property;
}

export function createProperty({userId, drinkCapa, drinkStyle, alcoholType}) {
  return usersCollection.doc(userId).collection('Property').add({
    drinkCapa,
    drinkStyle,
    alcoholType,
  });
}

export function createUserNFT({userId, nftProfile, nftId}) {
  return usersCollection.doc(userId).update({
    nftProfile: nftProfile,
    nftIds: firestore.FieldValue.arrayUnion(nftId),
  });
}
export function updateTokenAmount(userId, balance) {
  return usersCollection.doc(userId).update({
    tokenAmount: balance,
  });
}

//Update cretedroomId, joinedroomId
//userId, 'createdroomId', meetingId
//userId, 'joinedroomId', meetingId
export function updateUserMeetingIn(id, field, value) {
  return usersCollection
    .doc(id)
    .update({[field]: firestore.FieldValue.arrayUnion(value)});
}

export function updateUserMeetingOut(id, field, value) {
  return usersCollection
    .doc(id)
    .update({[field]: firestore.FieldValue.arrayRemove(value)});
}

//nickname으로 User 검색
export async function getUserByNickname(str, loginUser) {
  const strlength = str.length;
  const strFrontCode = str.slice(0, strlength - 1);
  const strEndCode = str.slice(strlength - 1, str.length);
  const endCode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
  const res = await usersCollection
    .where('nickName', '>=', str)
    .where('nickName', '<', endCode)
    .get();
  const data = res.docs.map(el => {
    if (el.id !== loginUser) {
      return {...el.data(), id: el.id};
    }
  });
  console.log(data);
  return data[0] === undefined ? [] : data;
}

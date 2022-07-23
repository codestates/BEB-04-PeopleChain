import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('User');

export function createUser({userId, nickName, gender, birth, picture}) {
  // return usersCollection.doc(id).get();
  // console.log(usersCollection);
  return usersCollection.doc(userId).set({
    userId,
    nickName,
    gender,
    birth,
    createdAt: firestore.FieldValue.serverTimestamp(),
    picture,
  });
}

export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}

export function createProperty({userId, drinkCapa, drinkStyle, alcoholType}) {
  return usersCollection.doc(userId).collection('Property').add({
    drinkCapa,
    drinkStyle,
    alcoholType,
  });
}

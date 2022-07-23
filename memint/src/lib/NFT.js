import firestore from '@react-native-firebase/firestore';

export const NFTCollection = firestore().collection('NFT');

export function createNFT({userId, nftImg}) {
  return NFTCollection.add({
    userId,
    nftImg,
    isProfile: true,
    isMemint: true,
  });
  // User collection doc에 NFT Id 추가
}

//프로필 렌더링
export async function filterProfile(userId) {
  let query = NFTCollection.where('userId', '==', userId).where(
    'isProfile',
    '==',
    true,
  );
  const profile = await query.get();
  const profileImg = profile.docs.map(doc => doc.data().nftImg);
  return profileImg.toString();
}

//미민이 렌더링
export async function filterMemin(userId) {
  let query = NFTCollection.where('userId', '==', userId).where(
    'isMemint',
    '==',
    true,
  );
  const doc = await query.get();
  const memin = doc.docs.map(doc => doc.data().nftImg);
  return memin.toString();
}

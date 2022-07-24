import {useSelector} from 'react-redux';

export default function useNft() {
  return useSelector(state => state.nft.NFT); //state.auth.user자리에 slice에서 선언한 state를 채워줌
}

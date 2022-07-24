import {useDispatch} from 'react-redux';
import {saveNFT} from '../../slices/NFT';
import {useMemo} from 'react';
import {bindActionCreators} from 'redux';

export default function useAuthActions() {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators({saveNFT}, dispatch), //authorize, logout자리에 action이름 선언
    [dispatch],
  );
}

import {combineReducers} from 'redux';
import auth from './Auth';
import nft from './NFT';
import offchain from './Offchain';

const rootReducer = combineReducers({
  auth, //slices/파일명.js에서 추가한 slice name을 여기에다가 추가
  nft,
  offchain,
});

export default rootReducer;

import {combineReducers} from 'redux';
import auth from './Auth';
import nft from './NFT';

const rootReducer = combineReducers({
  auth, //slices/파일명.js에서 추가한 slice name을 여기에다가 추가
  nft,
});

export default rootReducer;

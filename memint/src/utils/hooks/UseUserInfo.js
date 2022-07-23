import {useSelector} from 'react-redux';

export default function useUserInfo() {
  return useSelector(state => state.auth.userInfo); //state.auth.user자리에 slice에서 선언한 state를 채워줌
}

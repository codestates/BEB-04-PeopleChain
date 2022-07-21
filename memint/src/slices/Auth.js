import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null, //관리할 state 초기값 설정
};

const authSlice = createSlice({
  name: 'auth', // slice 이름 설정. 이 이름을 slices/index.js파일에 추가해 줘야함.
  initialState,
  reducers: {
    // state 변화할 action 이름 선언
    authorize(state, action) {
      // action의 인자값은 무조건 action.payload로 받음
      state.user = action.payload;
    },
    // action 인자값 없는 경우
    logout(state) {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const {authorize, logout} = authSlice.actions;

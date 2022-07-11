import { createSlice } from "@reduxjs/toolkit";

// 사용자 본인인지 확인 유무
// DefailPage에서 사용됨
interface IsMine {
  isMine: boolean;
}

const initialState: IsMine = {
  isMine: false,
};

export const isMineReducer = createSlice({
  name: "isMineReducer",
  initialState,
  reducers: {
    isMineTrue(state) {
      state.isMine = true;
    },
    isMineFalse(state) {
      state.isMine = false;
    },
  },
});

export const { isMineTrue, isMineFalse } = isMineReducer.actions;
export default isMineReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

interface MyPage {
  tapName: string;
}

const initialState: MyPage = {
  tapName: "MyPost",
};

export const myPageReducer = createSlice({
  name: "myPageReducer",
  initialState,
  reducers: {
    setTapName(state, action) {
      state.tapName = action.payload;
    },
  },
});

export const { setTapName } = myPageReducer.actions;
export default myPageReducer.reducer;

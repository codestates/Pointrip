import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginState, ILoginPayLoad, ILogin } from "../types/types";

// 로그인 요청을 위한 비동기 작업 함수 작성
// promise 결과가 반환되는 곳은 authReducer slice 객체 내 extraReducers
export const setAuth = createAsyncThunk(
  "authReducer/setAuth",
  async ({ email, password }: ILogin) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/users/login`,
      { email: email, password: password },
      {
        withCredentials: true,
      }
    );
  }
);

// default state
const initialState: ILoginState = {
  isLogin: false,
  isInValid: false,
  accessToken: "",
};

// authReducer slice 객체 만들기
export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setLogOut(state) {
      state.isLogin = false;
      state.accessToken = "";
    },
    setSocialLogin(state, action) {
      state.isLogin = true;
      state.isInValid = false;
      state.accessToken = action.payload;
    },
    // setLoginTapName(state, action) {
    //   state.loginTapName = action.payload;
    // },
  },
  extraReducers: {
    // pending 상태
    [setAuth.pending.type]: (state) => {
      state.isLogin = false;
      state.isInValid = false;
      state.accessToken = "";
    },
    // fulfilled 상태
    [setAuth.fulfilled.type]: (state, action: ILoginPayLoad) => {
      state.isLogin = true;
      console.log("fulfilled : state.isLogin => ", state.isLogin);
      state.isInValid = false;
      console.log("fulfilled : state.isInValid => ", state.isInValid);
      state.accessToken = action.payload.data.data.accessToken;
      console.log("action.payload => ", action.payload);
      console.log("action.payload.data => ", action.payload.data);
      console.log(
        "action.payload.data.message => ",
        action.payload.data.message
      );
      console.log("action.payload.data.accessToken => ", action.payload);
      console.log(
        "action.payload.data.data.accessToken => ",
        action.payload.data.data.accessToken
      );
      console.log("action => ", action);
    },
    // rejected 상태
    [setAuth.rejected.type]: (state) => {
      state.isLogin = false;
      state.isInValid = true;
      state.accessToken = "";
    },
  },
});

export const { setLogOut, setSocialLogin } = authReducer.actions;
export default authReducer.reducer;

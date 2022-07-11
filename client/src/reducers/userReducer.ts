import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setUser = createAsyncThunk(
  // createAsyncThunk는 thunk action creator를 반환한다.
  "userReducer/setUser",
  async (accessToken: string) => {
    try {
      return await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
);

interface UserPayLoad {
  payload: {
    data: {
      data: {
        userInfo: {
          id: number; // 가입한 순서대로 DB에 생성되는 유저 별 고유한 값
          email: string;
          username: string;
          profileImg: null | string;
          introduction: null | string;
        };
        myPost: number; // 설명 : 사용자 본인이 작성한 게시물의 개수
        // 서버로부터 전달되지 않고 있음
        myStorage: number; // 설명 : 사용자 본인이 찜한 게시물의 개수
        // 서버로부터 전달되지 않고 있음
      };
    };
  };
}
interface Userstate {
  id: number; // 가입한 순서대로 DB에 생성되는 유저 별 고유한 값
  email: string; // 가입된 사용자의 email === id
  username: string; // 가입된 사용자의 username
  profileImg: null | string; // 가입된 사용자의 프로필 사진
  introduction: null | string; // 가입된 사용자의 자시 소개글
  // loginType: boolean; // 가입된 사용자가 로그인을 했는지 확인하는 state 기본은 false
  myPost: number;
  myStorage: number;
}

let initialState: Userstate = {
  id: 0,
  email: "",
  username: "",
  profileImg: null,
  introduction: null,
  // loginType: false,
  myPost: 0,
  myStorage: 0,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    // 내가 찜한 일정 목록 업로드
    setPlusMyStorage(state) {
      state.myStorage += 1;
    },
    setMinusMyStorage(state) {
      state.myStorage -= 1;
    },
  },
  extraReducers: {
    // pending 상태
    [setUser.pending.type]: (state) => {
      state.id = 0;
      state.email = "";
      state.username = "";
      state.profileImg = "";
      state.introduction = "";
      state.myPost = 0;
      state.myStorage = 0;
      // state.loginType = false;
    },
    // fulfilled 상태
    [setUser.fulfilled.type]: (state, action: UserPayLoad) => {
      console.log("action.payload.data.data=> ", action.payload.data.data);
      console.log(
        "action.payload.data.data.userInfo=> ",
        action.payload.data.data.userInfo
      );
      console.log(
        "[로그인 후][userReducer][serUser] id => ",
        action.payload.data.data.userInfo.id
      );
      console.log(
        "[로그인 후][userReducer][serUser] email => ",
        action.payload.data.data.userInfo.email
      );
      console.log(
        "[로그인 후][userReducer][serUser] username => ",
        action.payload.data.data.userInfo.username
      );
      console.log(
        "[로그인 후][userReducer][serUser] profileImg => ",
        action.payload.data.data.userInfo.profileImg
      );
      console.log(
        "[로그인 후][userReducer][serUser] introduction => ",
        action.payload.data.data.userInfo.introduction
      );
      console.log(
        "[로그인 후][userReducer][serUser][사용자가 작성한 게시물 개수] myPost => ",
        action.payload.data.data.myPost
      );
      console.log(
        "[로그인 후][userReducer][serUser][사용자가 찜한 게시물 개수] myStorage => ",
        action.payload.data.data.myStorage
      );
      state.id = action.payload.data.data.userInfo.id;
      state.email = action.payload.data.data.userInfo.email;
      state.username = action.payload.data.data.userInfo.username;
      state.profileImg = action.payload.data.data.userInfo.profileImg;
      state.introduction = action.payload.data.data.userInfo.introduction;
      // state.loginType = action.payload.data.data.loginType;
      state.myPost = action.payload.data.data.myPost;
      state.myStorage = action.payload.data.data.myStorage;
    },
    // rejected 상태
    [setUser.rejected.type]: (state) => {
      state.id = 0;
      state.email = "";
      state.username = "";
      state.profileImg = "";
      state.introduction = "";
      state.myPost = 0;
      state.myStorage = 0;
      // state.loginType = false;
    },
  },
});

export const { setPlusMyStorage, setMinusMyStorage } = userReducer.actions;
export default userReducer.reducer;

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// storage : 웹의 localStoage
import storage from "redux-persist/lib/storage/session";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import myPageReducer from "./myPageReducer";
// import searchReducer from "./searchReducer"; 도메인 요청 이후 작업
import isMineReducer from "./isMineReducer";

// persisConfig = {} : 새로운 persist 선언
const persistConfig = {
  key: "root", // key : reducer의 어느 지점에서부터 데이터를 저장할 것 인지,
  storage, // storage : 웹의 localStorage
  blacklist: ["authReducer"],
};

// authReducer에 isInValid를 새로고침시 초기화되도록 블랙리스트로 설정
const authReducerConfig = {
  key: "authReducer",
  storage,
  blacklist: ["isInValid"],
};

const rootReducer = combineReducers({
  authReducer: persistReducer(authReducerConfig, authReducer),
  userReducer,
  myPageReducer,
  isMineReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// persistReducer(persisConfig, reducer) : persisConfig가 추가된 reducer 반환
export default persistReducer(persistConfig, rootReducer);

import { configureStore } from "@reduxjs/toolkit";
//* configureStore는 store 내 reducer를 통한 state 변화와 action dispatch 등의 흐름을 UI를 통해 관리해주는 기능을 제공한다.
//* 이는 데이터가 저장되어 있는 곳이 store 하나 뿐이며, endpoint도 유일하기 때문에 가능하다.
// ex) const store = configureStore({reducer})
// configureStore를 통해 생성한 store는 redux DevTools(관리자 UI)를 통해 데이터 흐름과 관리 등을 가능하게 해준다.
import { persistStore } from "redux-persist";
//? persistState를 적용한 이유는 무엇인가?
// 리덕스의 store은 페이지를 새로고침 할 경우 store의 저장된 state가 초기화되는 문제를 가지고 있다.
// 이에 대한 해결 방법으로 LocalStorage와 SessionStorage의 storage를 redux에서 사용하게 해주는 Redux-Persist 라이브러리를 사용하여 해결할 수 있다.
import rootReducer from "../reducers/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // 직열화 무시할 액션
          "persist/PERSIST", //
          "authReducer/setAuth/fulfilled", // accessToken, data
          "userReducer/setUser/fulfilled", // payload.data.data === Object
        ],
      },
    }),
});
// persistStore : 새로 고침, 종료해도 지속될 store 생성
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

// 하나의 저장소(store)가 존재하며, 이 저장소(store)에는 애플리케이션의 모든 상태들이 객체 트리 구조로 저장되어 있다.
// -> 서버로부터 가져온 상태는 직렬화(serialized)되거나, 수화되어(hydrated) 전달되며 클라이언트에서 추가적인 코딩 없이도 사용할 수 있다.
// 하나의 상태 트리만을 가지고 있기 때문에 디버깅에도 용이하다.

// 직렬화(serialize)란?
// 직렬화 예시, localstorage는 값으로 string을 가질 수 있지만 object는 가질 수 없다.
// 이때, json.stringify를 통해서 object를 string화한다. 이것이 직렬화다. 다시 꺼내쓸 때는 json.parse를 하여 다시 string을 object화 하는데,
// 이것이 역직렬화다. 이때, 직렬화 전 object와 역직렬화된 object는 같아야 한다.
// -> redux에서 function,promise등과 같은 non-serializable type을 저장하면,
// redux-devtools에서 표시가 안되고, 또 콘솔에서 경고 메세지를 던진다. redux에서는 store의 일관성 유지, 복원 기능,
// 시간여행 디버깅 등이 방해받을 수 있기에 non-serializable type을 저장하는 걸 권하지 않는다고 한다.
// https://velog.io/@daeseongkim/Redux%EC%9D%98-3%EA%B0%80%EC%A7%80-%EC%9B%90%EC%B9%99

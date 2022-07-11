import { useState } from "react";
import { useNavigate } from "react-router";
import { Body } from "./Main.style";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers/rootReducer";

export default function MainPage() {
  // const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(
    sessionStorage.getItem("isAuthenticated")
  );
  const navigate = useNavigate();

  const { isLogin } = useSelector((state: RootState) => state.authReducer);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  // console.log("accessToken => ", accessToken);
  const dispatch = useDispatch();

  // console.log("메인 페이지 document.cookie=> ", document.cookie);

  return (
    <Body>
      {isLogin ? (
        <>
          <button
            onClick={() => {
              navigate("/signUp");
            }}
          >
            내 일정 만들기
          </button>
          <button
            onClick={() => {
              navigate("/showAllPage");
            }}
          >
            로그인
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            회원가입
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/mypage");
            }}
          >
            내 일정 만들기
          </button>
          <button
            onClick={() => {
              navigate("/showAllPage");
            }}
          >
            로그아웃
          </button>
          <button
            onClick={() => {
              navigate("/mypage");
            }}
          >
            myPage로 이동
          </button>
        </>
      )}
    </Body>
  );
}

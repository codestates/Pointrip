import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers/rootReducer";
import { setLogOut } from "reducers/authReducer";

export default function Nav() {
  const { isLogin } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <a
          onClick={() => {
            navigate("/showAllPage");
          }}
        >
          모두보기
        </a>

        {!isLogin ? (
          <>
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              내 일정 만들기
            </a>
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </a>
            <a
              onClick={() => {
                navigate("/signUp");
              }}
            >
              회원가입
            </a>
          </>
        ) : (
          <>
            <a
              onClick={() => {
                navigate("/createPostPage");
              }}
            >
              내 일정 만들기
            </a>
            <a
              onClick={() => {
                dispatch(setLogOut());
                navigate("/");
              }}
            >
              로그아웃
            </a>
            <a
              onClick={() => {
                navigate("/mypage");
              }}
            >
              myPage로 이동
            </a>
          </>
        )}
      </nav>
    </>
  );
}

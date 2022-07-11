import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BackGround, Body } from "./Login.style";
import { RootState } from "../../reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setSocialLogin } from "../../reducers/authReducer";
import { Link, Navigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import queryString from "query-string";

export default function LoginPage() {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const { isLogin, isInValid } = useSelector(
    (state: RootState) => state.authReducer
  );
  // 이메일과 비밀번호 인풋값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  // console.log("LoginpageisLogin", isLogin);
  //   const { loginTapName } = useSelector((state: RootState) => state.authReducer);
  //   // 선택한 탭의 이름을 스토어에 저장
  //   const handleTapBtn = (loginTapName: string) => {
  //     dispatch(setLoginTapName(loginTapName));
  //   };
  // 이메일 값을 저장
  const setEmailData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  // 비밀번호 값을 저장
  const setPasswordData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  // dispatch로 setAuth에 서버에 로그인 요청
  const handleLoginBtn = (email: string, password: string) => {
    dispatch(setAuth({ email: email, password: password }));
  };

  // // 네이버 로그인 버튼을 누르면 서버에 구글 로그인 요청
  // const handleGoogleLoginBtn = async () => {
  //   await window.location.assign(
  //     `http://ec2-3-84-176-49.compute-1.amazonaws.com:4000/user/login/naver`
  //   );
  // };

  // 카카오 로그인 버튼을 누르면 서버에 카카오 로그인 요청
  const handleKakaoSignupBtn = async () => {
    await window.location.assign(`${process.env.REACT_APP_API_URL}/oauth`);
  };
  // 인풋 입력 후 엔터를 치면 로그인 요청을 보냄
  const handleKeyPress = (
    e: React.KeyboardEvent,
    email: string,
    password: string
  ) => {
    if (e.key === "Enter") {
      handleLoginBtn(email, password);
    }
  };

  // 서버에서 쿼리에 access_token을 보내주면 현재 url을 감지해 access_token을 저장
  useEffect(() => {
    const query = queryString.parse(window.location.search);
    if (query.access_token) {
      dispatch(setSocialLogin(query.access_token));
    }
  }, [window.location]);
  return (
    <BackGround>
      <Body>
        <div className="signDetail">
          <ul className="loginOrSignup">
            <li>
              <button
                className="navigateBtn clicked"
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </button>
            </li>
            <li>
              <button
                className="navigateBtn"
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                회원가입
              </button>
            </li>
          </ul>
          <div className="form">
            <div>
              <label className="blind" htmlFor="email">
                이메일
              </label>
              <input
                type="text"
                placeholder="E-mail"
                onChange={(e) => setEmailData(e)}
                onKeyPress={(e) => handleKeyPress(e, email, password)}
              />
            </div>
            <div>
              <label className="blind" htmlFor="password">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호"
                onChange={(e) => setPasswordData(e)}
                onKeyPress={(e) => handleKeyPress(e, email, password)}
              />
              {isInValid ? (
                <>
                  <p className="alert">이메일과 비밀번호를 확인해 주세요.</p>
                </>
              ) : null}
            </div>
            {/*로그인 버튼---------------------------------------------------------*/}
            <button onClick={() => handleLoginBtn(email, password)}>
              로그인
            </button>
          </div>
          <div className="social">
            <p>소셜 로그인</p>
            <button onClick={() => handleKakaoSignupBtn()}>Kakao</button>
            <div className="quickAccount">
              <span>체험용 로그인 아이디를 제공합니다.</span>
              <br />
              ID : aaa@aaa.a
              <br />
              PW : aaaaaa1!
            </div>
          </div>
        </div>
      </Body>
    </BackGround>
  );
}

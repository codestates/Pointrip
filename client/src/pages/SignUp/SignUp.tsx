import React, { useState, useReducer, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Gender, Member, Role } from "../../@types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setSocialLogin } from "../../reducers/authReducer";
// import { AppDispatch } from "../../store/store";
import { RootState } from "reducers/rootReducer";
import { BackGround, Body } from "./SignUp.style";

export default function SignUpPage() {
  const { isLogin } = useSelector((state: RootState) => state.authReducer);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
    clearErrors,
    getValues,
    trigger,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all", // you will need to enable validate all criteria mode
  });

  const { isSubmitted } = formState;

  const onSubmit = (data: any) => {
    // alert(JSON.stringify(data));

    axios
      .post(
        "https://pointrip.net/users",
        {
          email: `${data.email}`,
          username: `${data.username}`,
          password: `${data.password}`,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("회원가입 완료");
        console.log(res.config.data);
        navigate("/login");

        // setModal(!modal);
      })
      .catch((err) => {
        console.log("err message =>", err);
      });
  };

  const onInput = (name: string | undefined) => {
    if (!isSubmitted) {
      clearErrors(name);
    }
  };

  const isOverlappedUsername = (username: string) => {
    return axios
      .get(`https://pointrip.net/users/nick/${username}`)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          return true;
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          return false;
        }
        return true;
      });
  };

  const isOverlappedEmail = (email: string) => {
    return axios
      .get(`https://pointrip.net/users/mail/${email}`)
      .then((data) => {
        if (data.status === 200) {
          return true;
        }
         return true;
      })
      .catch((err) => {
        if (err.response.status === 409) {
          return false;
        }
        return true;
      });
  };

  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  // const handleGoogleLoginBtn = async () => {
  //   await window.location.assign(`https://pointrip.net/user/login/naver`);
  // };

  // 카카오 로그인 버튼을 누르면 서버에 카카오 로그인 요청
  const handleKakaoSignupBtn = async () => {
    await window.location.assign(`${process.env.REACT_APP_API_URL}/oauth`);
  };

  return (
    <BackGround>
      <Body>
        <div className="signDetail">
          <ul>
            <li>
              <button
                className="navigateBtn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                로그인
              </button>
            </li>
            <li>
              <button
                className="navigateBtn clicked"
                onClick={() => {
                  navigate("/signUp");
                }}
              >
                회원가입
              </button>
            </li>
          </ul>
          <form className="form" action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="blind" htmlFor="email">
                이메일
              </label>
              <input
                placeholder="E-mail"
                onInput={() => {
                  onInput("email");
                }}
                {...register("email", {
                  required: true,
                  validate: {
                    checkform: (v) =>
                      reg_email.test(v) || "올바른 이메일 형식이 아닙니다.",
                    checkUrl: (v) => isOverlappedEmail(v),
                  },
                })}
              />
              {errors.email?.type === "checkform" && (
                <p className="alert">{errors.email.message}</p>
              )}
              {errors.email?.type === "checkUrl" && (
                <p className="alert">'이미 등록된 이메일입니다.'</p>
              )}
              {/* // 이유는 모르겠지만, 두번째 객체부터는 보통 빈문자열로 나온다. */}
            </div>
            <div>
              <label className="blind" htmlFor="username">
                닉네임
              </label>
              <input
                placeholder="닉네임"
                onInput={() => {
                  onInput("username");
                }}
                {...register("username", {
                  required: true,
                  minLength: 2,
                  maxLength:8,
                  validate: {
                    checkUrl: (v) =>
                      isOverlappedUsername(v) || "이미 등록된 닉네임입니다.",
                  },
                  // void에러 => return을 함수안에서 안해준 것임.
                  // async (v) => await fetch()
                  // async (v) => fetch()
                  // (v) => fetch()
                  // 이 3가지는 다 올바른 방법
                  // (v) => await fetch() xxxxxx
                })}
              />
              {errors.username?.type === "minLength" && (
                <p className="alert">"최소 2자 이상 적어주세요."</p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className="alert">"8자 이하로 적어주세요."</p>
              )}
              {errors.username?.type === "checkUrl" && (
                <p className="alert"> '이미 등록된 닉네임입니다.'</p>
              )}
            </div>
            <div>
              <label className="blind" htmlFor="password">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호"
                onInput={() => {
                  onInput("password");
                }}
                {...register("password", {
                  required: true,
                  minLength: 8,
                  validate: {
                    includesAlphabet: (v) =>
                      /[a-zA-Z]/.test(v) || "알파벳을 포함해야 합니다.",
                    includesNumber: (v) =>
                      /[0-9]/.test(v) || "숫자를 포함해야 합니다",
                    includesSpecialCharacters: (v) =>
                      /[!?@#$%^&*():;+\-=~{}<>]/.test(v) ||
                      "특수문자를 포함해야 합니다",
                  },
                })}
              />
              {errors.password?.type === "required" && (
                <p className="alert">"비밀번호를 적어주세요."</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="alert">"최소 8자리 이상 적어주세요."</p>
              )}
              {errors.password?.message !== undefined &&
                errors.password?.message !== "" &&
                errors.password?.type !== "required" && (
                  <p className="alert">{errors.password?.message}</p>
                )}
            </div>
            <div>
              <label className="blind" htmlFor="password">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="passwordConfirm"
                placeholder="비밀번호"
                onInput={() => {
                  onInput("passwordConfirm");
                }}
                {...register("passwordConfirm", {
                  required: "비밀번호를 확인해 주세요",
                  validate: {
                    matchesPreviousPassword: (v: string) => {
                      const { password } = getValues();
                      return password === v || "비밀번호가 일치하지 않습니다.";
                    },
                  },
                })}
              />
              {errors.passwordConfirm?.message !== undefined &&
                errors.passwordConfirm?.message !== "" &&
                errors.passwordConfirm?.type !== "required" && (
                  <p className="alert">{errors.passwordConfirm?.message}</p>
                )}
            </div>
            <button type="submit">회원가입</button>
          </form>
          <div className="social">
            <p>소셜 회원가입</p>
            <button onClick={() => handleKakaoSignupBtn()}>Kakao</button>
            <div className="quickAccount">
            <span>체험용 로그인 아이디를 제공합니다.</span>
            <br/>ID : aaa@aaa.a
            <br/>PW : aaaaaa1!
            </div>
          </div>
        </div>
        {/* <button onClick={memberLoginProc}>(일반회원) 로그인 하기</button> */}
      </Body>
      {/* 소셜 회원가입 BTN */}
    </BackGround>
  );
}

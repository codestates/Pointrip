import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../reducers/rootReducer";
import { setUser } from "../../../reducers/userReducer";

import { Body, Top, InputList } from "./EditProfile.style";
import { AppDispatch } from "../../../store/store";
import { setLogOut } from "reducers/authReducer";
import { json } from "stream/consumers";


export default function EditProfile() {
  // 저장된 토큰값을 가져옴
  const dispatch: AppDispatch = useDispatch();


  const { accessToken, isLogin } = useSelector(
    (state: RootState) => state.authReducer
  );

  // 유저 정보를 스토어에서 가져옴
  // 처음에 null일 수 있는 정보 === introduction, profileImg
  const { username, email, introduction, profileImg } = useSelector(
    (state: RootState) => state.userReducer
  );

  
  console.log("//username "+username, "// introduction " + introduction, "//profileImg "+profileImg)

  type ProfileFormData = {
    username: string;
    introduction: null | string;
    image: File[];
    password: string;
    passwordConfirm: string;
  }

  const navigate = useNavigate();
  const {
    register,
    setValue,
    formState: { errors },
    setError,
    handleSubmit,
    formState,
    clearErrors,
    getValues,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues : { username, introduction, image: [], password: '', passwordConfirm: '' },
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all", // you will need to enable validate all criteria mode
  });

  const { isSubmitted } = formState;
  
  // onSubmit={(e) => new FormData(e.target) HTMLFormElement }

  const onInput = (name: keyof ProfileFormData) => {
    if (!isSubmitted) {
      clearErrors(name);
    }
  };

  const [pfImgPreview, setPfImgPreview] = useState('');
  const image = watch('image');
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPfImgPreview(URL.createObjectURL(file));
    }
  }, [image]);

  // 타입 계층!
  // 상위 타입 Blob, HTMLElement, 포유류
  // 하위 타입 File, HTMLInputElement, 강아지

  // 상위 타입 자리에 하위타입을 넣을 수 있어요.
  // Blob 자리에 File을 넣을 수 있지만
  // File 자리에 Blob을 넣을 수 없어요.
  
  // {"0":{}} => 객체가 아니라 arraylike입니다.
  // FileList
  // document.getElementsByClassName('')

  // array like
  // length, 인덱스는 있는데
  // 배열 메서드를 못 쓴다...

  const isOverlappedUsername = (username: string) => {
    if(username === username){return true}
    return axios
      .get(`https://pointrip.net/users/nick/${username}`)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          return true;
        }
      })
      .catch((err) => {
        if (err.response.status === 409)
        {return false;}
        return true;
      });
  };
  
  // 제출을 누르자 마자 보낼 정보
  const onSubmit = async (data: ProfileFormData) => {
    // alert(JSON.stringify(data));
    const formData = new FormData();
    // form데이터 형식에 image파일은 하나만 넣을거라는 전제 하에서 작성함.
    // entry 를 적용하면 {key, value} => [key, value] 가 됨.
    for(const entry of Object.entries(data)){
      if (typeof entry[1] === 'string'){
        if(entry[0] === "passwordConfirm"){
          continue;
        }
        formData.append(entry[0], entry[1]);
      } else {
        const profileImg = entry[1]
        if(profileImg && profileImg.length > 0){
          formData.append("profileImg", profileImg[0]);
        }
      }
    }
    

    const result = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users`,
      // process.env.REACT_APP_API_URL === https://pointrip.net
      formData,
      // 형식 맞춰주기 null일때, 이전의 값으로 그냥 박음.
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
      );
      if (result.status === 200) {
        dispatch(setUser(accessToken));
      }

  };

  const DeleteAccount = async () =>{
    if (window.confirm("정말로 탈퇴 하시겠습니까?")) {
        const result = await axios.delete(
          // https://pointrip.net/users/:email
          `${process.env.REACT_APP_API_URL}/users/${email}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (result.status === 200) {
          // 포스트 삭제 했을 경우
          console.log("result.data.message => ", result.data.message); // 
          alert("탈퇴되었습니다.");
          dispatch(setLogOut());
        } else if (result.status === 404) {
          console.log("result.data.message => ", result.data.message); // message: "삭제하려는 게시물이 없습니다."
        }
      }else {
      alert("취소합니다.");
    }
  };

  return (
    <Body>
      <h2 className="Title">프로필 수정</h2>
      <form className="form" action="" onSubmit={handleSubmit(onSubmit)}>
        <Top>
          <div className="pfImg">
            <img
              src={pfImgPreview? `${pfImgPreview}`:
              (profileImg ? 
                (!profileImg.includes(":") ?
                  (`${process.env.REACT_APP_API_URL}/uploads/${profileImg}`) 
                  :
                  (`${profileImg}`)
                ) 
                :
                (`../images/defaultImg.jpg`))}
              alt="Profile"
            />
            <div className="pfNick">
              {/* 개발자가 보기 쉽게 하기 위함 임. 기존 닉네임과 이메일이 없는 유저는 없음. */}
              <p>{username? username : "기존 닉네임"}</p>
              <p>{email? email : "이메일"}</p>
              <div>
              
                {/* 프사는 무조건 처음에는 null이거나 undefined일 것이다. 
                => 따라서 지금 사진값 === 변경이전사진 또는 변경이후사진 */}
                {/* 웨안뒈???
                https://stackoverflow.com/questions/59005551/how-to-use-useref-for-the-attribute-htmlfor
                 */}
              <label htmlFor="image">
                <button>프로필 사진 바꾸기</button>
                <input onInput={()=> {
                onInput("image");
                }}
                {...register("image",{
                

                })}
                
                id="picture"
                type="file"
                className="hidden"
                accept="image/*"
                />
              </label>

              <button onClick={()=>{DeleteAccount()}}>회원 탈퇴</button>
              </div>
            </div>
          </div>
          <button type="submit">수정 완료</button>
        </Top>
        <InputList>
          <div>
            <label htmlFor="username">
              닉네임
            </label>
            <input placeholder={username ? username : "닉네임"} onInput={()=> {
            onInput("username");
            }}
            {...register("username", {
            

            minLength: 2,
            maxLength: 8,
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
            <label htmlFor="introduction">소개</label>
            <input className="introduction" placeholder={introduction ? introduction : "한 줄 소개" }
            onInput={()=> {
            onInput("introduction");
            }}
            {...register("introduction",{
              maxLength:25
            })}
            />
            {errors.introduction?.type === "maxLength" && (
            <p className="alert">"25자 이하로 적어주세요."</p>
            )}
          </div>

          <div>
            <label htmlFor="password">
              새 비밀번호
            </label>
            <input type="password" id="password" placeholder="비밀번호 8자리 이상 숫자 및 특수문자 조합" onInput={()=> {
            onInput("password");
            }}
            {...register("password", {
            
            
            minLength: 0 || 8,
            validate: {
            
            includesAlphabet: (v) => { 
              if(v.length === 0){return true}
              /[a-zA-Z]/.test(v) || "알파벳을 포함해야 합니다."},
              
              includesNumber: (v) =>{
              if(v.length === 0){return true}
              /[0-9]/.test(v) || "숫자를 포함해야 합니다"},

              includesSpecialCharacters: (v) =>{
              if(v.length === 0){return true}
            /[!?@#$%^&*():;+\-=~{}<>]/.test(v) ||
              "특수문자를 포함해야 합니다"},
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
            <label htmlFor="password">
              새 비밀번호 확인
            </label>
            <input type="password" id="passwordConfirm" placeholder="비밀번호 확인" onInput={()=> {
            onInput("passwordConfirm");
            }}
            {...register("passwordConfirm", {
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
        </InputList>
      </form>
    </Body>
  );
  }
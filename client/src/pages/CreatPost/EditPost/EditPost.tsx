import axios from "axios";
// React-Router v5(useHistory) -> v6(useNavigate)
import { useNavigate, useLocation } from "react-router";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { RootState } from "../../../reducers/rootReducer";
import { useSelector } from "react-redux";

import DefaultHeader from "../../../layouts/header/index";
import SearchAddress from "../../../components/SerachAddress/SearchAddress";
import KakaoMap from "../../../components/KakaoMap/KakaoMap";
import {
  Body,
  InfoBox,
  Buttons,
  UploadPhotoArea,
  InputList,
} from "../Create&Edit&Detail.style";
export default function EditPost() {
  const navigate = useNavigate();
  let location: any = useLocation();
  console.log("[게시물]] location => ", location);
  console.log(
    "++++현재 게시물에 대한 location.state.postData => ",
    location.state.postData
  );
  const submitStateHandler = () =>
    navigate("/detail", {
      state: { postId: location.state.postData.postId },
    });
  const postData = location.state.postData;
  // 모든 값이 입력되었는지 확인<boolean>
  const [isCompleted, setIsCompleted] = useState<boolean>(true);
  // 저장된 토큰값을 가져온다. useSelector는 store에 저장된 state가 변경될 때,
  // 해당 state를 사용하는 UI를 즉시 변경시켜주는 구독 기능이 포함되어 있다.
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  // 게시물 제목 State, Handle
  const [inputTitle, setInputTitle] = useState<string>("");
  const TitleInputHandle = (value: string) => {
    setInputTitle(value);
    setIsCompleted(true);
  };
  // 게시물 한 줄 일기 state, Handle
  const [inputDiary, setInputDiary] = useState<string>("");
  const DiaryInputHandle = (value: string) => {
    setInputDiary(value);
    setIsCompleted(true);
  };

  // 게시물 날짜 state, Handle
  const [inputDate, setInputDate] = useState<string>("");

  console.log("------------- inputDate => ", inputDate);
  // 기존 imagePath
  let imageStr = "";
  if (postData.image1 !== null) {
    imageStr = `${postData.image1},`;
  }
  if (postData.image2 !== null) {
    imageStr = `${imageStr}${postData.image2},`;
  }
  if (postData.image3 !== null) {
    imageStr = `${imageStr}${postData.image3},`;
  }
  if (postData.image4 !== null) {
    imageStr = `${imageStr}${postData.image4},`;
  }
  if (postData.image5 !== null) {
    imageStr = `${imageStr}${postData.image5},`;
  }
  let arr = imageStr.split(",");
  let arrSlice = arr.slice(0, arr.length - 1);
  if (arrSlice[0] === "") {
    arrSlice = [];
  }
  // console.log("imagePath => ", imagePath);
  // // 삭제 imagePath
  const [imageDelete, setImageDelete] = useState<string[]>([]);

  // 업로드 할 사진정보 state
  const [uploadFiles, setUploadFiles] = useState<any[] | undefined[]>([]);
  const [postImagePath, setPostImagePath] = useState<string[]>(arrSlice);

  console.log("기존이미지", postImagePath);
  console.log("삭제할이미지", imageDelete);
  console.log("올릴사진", uploadFiles);

  const photoPath = (file: any) => {
    let newFiles = [...uploadFiles];
    let newFileLen = newFiles.length;
    let postImgPathLen = postImagePath.length;
    if (uploadFiles.length + postImgPathLen > 5) {
      alert("더이상 등록 할 수 없습니다.");
    } else if (uploadFiles.length + postImgPathLen + file.length > 5) {
      alert("5장까지만 등록 해 주세요.");
    } else if (newFileLen + postImgPathLen < 5) {
      for (let i = 0; i < file.length; i++) {
        file[i].preview = URL.createObjectURL(file[i]);
        newFiles.push(file[i]);
      }
      newFiles = newFiles.slice(0, newFiles.length);
      setUploadFiles(newFiles);
    }
  };

  const deletePhotoHandle = (type: string, path: string) => {
    if (type === "delete") {
      const deleteFiles = postImagePath.filter((file) => {
        return file === path;
      });
      if (!imageDelete.length) {
        setImageDelete(imageDelete.concat(deleteFiles));
      }
      const newImagePath = postImagePath.filter((file) => {
        return file !== path;
      });
      setPostImagePath(newImagePath);
    } else if (type === "addFile") {
      const newFiles = uploadFiles.filter((file) => {
        return file.preview !== path;
      });
      setUploadFiles(newFiles);
    }
  };

  // 주소 입력 state, Handle
  const [addressInput, setAddressInput] = useState("");
  const searchAddressHandle = (address: string) => {
    setAddressInput(address);
    setIsCompleted(true);
    console.log("addressInput => ", addressInput);
  };

  const [addressCoordinate, setAddressCoordinate] = useState<number[]>([]);

  console.log(
    " ++=+++++location.state.postData.postId => ",
    location.state.postData.postId
  );
  const searchCoordinateHandle = (lat: number, log: number) => {
    let newCoordinate: number[] = [];
    newCoordinate.push(lat);
    newCoordinate.push(log);
    setAddressCoordinate(newCoordinate);
  };

  const registerPost = async () => {
    window.scrollTo({ top: 0, left: 0 });
    // if (
    //   inputTitle !== "" &&
    //   inputDiary !== "" &&
    //   inputDate! == "" &&
    //   uploadFiles.length + postImagePath.length > 0
    //   // addressInput !== ""
    // ) {
    const formData = new FormData();
    uploadFiles.forEach((file) => formData.append("image", file));
    formData.append("imageDelete", imageDelete.join(","));
    formData.append("imagePath", postImagePath.join(","));
    formData.append("title", inputTitle);
    formData.append("diary", inputDiary);
    formData.append("day", inputDate);
    formData.append("address", addressInput);
    formData.append("latitude", `${addressCoordinate[0]}`);
    formData.append("longitude", `${addressCoordinate[1]}`);

    const result: any = await axios.patch(
      `${process.env.REACT_APP_API_URL}/plan/postId=${location.state.postData.postId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (result) {
      console.log("수정하기 aixos 응답 result => ", result);
      navigate(`/detail`, {
        state: {
          postId: location.state.postData.postId,
          postInfo: location.state.postData,
        },
      });
    } else {
      setIsCompleted(false);
      // }
    }
  };
  const EditPullDataHandle = (postData: any) => {
    // let images = postData.imagePath.split(",");
    console.log(" useEffect postData => ", postData);
    setInputTitle(postData.title);
    setInputDiary(postData.diary);
    setInputDate(postData.day);
    setAddressInput(postData.address);
  };

  // 수정을 진행할 해당 게시물의 정보를 불러온다.
  useEffect(() => {
    EditPullDataHandle(location.state.postData);
  }, []);

  //  오늘 날짜 구하기 date 선택 제한
  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    if (day < 10) {
      return `${year}-${month + 1}-0${day}`;
    } else {
      return `${year}-${month + 1}-${day}`;
    }
  };

  const goDetail = () => {
    navigate(`/detail`, {
      state: {
        postId: location.state.postData.postId,
        postInfo: location.state.postData,
      },
    });
  };

  return (
    <>
      <DefaultHeader />
      <Body>
        <div>
          {/* 유저 프로필 */}
          <InfoBox>
            {/* 프로필 사진 이미지 데이터의 상태 :
              유저가 프로필 사진을 등록하지 않았다면 기본 프로필 이미지를,
              등록했다면 등록한 이미지를 보여줌.
              컴퓨터에서 파일 이름에 특수문자 ":"를 넣을 수 없다는 점을 이용하여 소셜로그인시 저장된 프로필 사진인지, 열린집을 통해 업데이트한 사진인지 판별 */}
            <div className="pfImg">
              <img
                src={
                  postData.profileImg
                    ? !postData.profileImg.includes(":")
                      ? `${process.env.REACT_APP_API_URL}/uploads/${postData.profileImg}`
                      : `${postData.profileImg}`
                    : `../images/defaultImg.jpg`
                }
                alt="Profile"
              />
            </div>
            <div className="pfTxt">
              <p className="name">
                {!postData.username ? "닉네임" : postData.username}
              </p>
              <p className="intro">
                {!postData.introduction ? "" : postData.introduction}
              </p>
            </div>
          </InfoBox>
          {/* 등록 & 취소 btn*/}
          <Buttons>
            {/* axios 요청 메시지 */}
            {!isCompleted ? (
              <p className="alert">필수 항목을 모두 입력해 주세요.</p>
            ) : null}
            <button onClick={() => registerPost()}>등록하기</button>
            <button onClick={() => goDetail()}>취소하기</button>
            {/* 희망사항 : 취소하면 detail로 갔으면.... */}
          </Buttons>
        </div>
        <section>
          {/* 사진 업로드 구간 */}
          <UploadPhotoArea>
            <div className="thumbs">
              {/* 아무 사진도 없을 때 */}
              {postImagePath.length + uploadFiles.length === 0 ? (
                <>
                  <div className="thumb example"></div>
                  <div className="thumb example"></div>
                  <div className="thumb example"></div>
                  <div className="thumb example"></div>
                  <div className="thumb example"></div>
                </>
              ) : (
                <></>
              )}
              {/* 기존에 저장되어 있던 img */}
              {postImagePath.map((file: any, idx: any) => {
                return (
                  <div
                    key={`${file}+${idx}`}
                    id={`${file}+${idx}`}
                    className="thumb"
                  >
                    <button
                      className="delete"
                      onClick={() => deletePhotoHandle("delete", file)}
                    >
                      {/* ../images/delet.svg 를 button 배경으로 심는다. */}
                    </button>
                    <img src={file} alt="Upload_Photo" />
                    {/* src={file.slice(6)} */}
                  </div>
                );
              })}
              {/* 새롭게 저장할 img */}
              {uploadFiles.map((file: any, idx: any) => {
                return (
                  <div
                    key={`${file.preview}+${idx}`}
                    id={file.preview}
                    className="thumb"
                  >
                    <button
                      className="delete"
                      onClick={() => deletePhotoHandle("delete", file.preview)}
                    >
                      {/* ../images/delet.svg 를 button 배경으로 심는다. */}
                    </button>
                    <img src={file.preview} alt="Upload_Photo" />
                  </div>
                );
              })}
            </div>
            {postImagePath.length + uploadFiles.length < 5 ? (
              <div className="plusBtn">
                <input
                  type="file"
                  // TIL : input element의 file 속성은 기본적으로 하나의 파일만 선택 가능하다.
                  // 그렇다면, 여러 개의 파일을 선택할 수는 없을까?
                  // 이때 사용되는 옵션이 'multiple' 이다.
                  multiple
                  accept={".jpg,.png"}
                  onChange={(e) => photoPath(e.target.files)}
                />
              </div>
            ) : (
              // 가상태그에 ../images/plusBtn.svg 삽입바람.
              <></>
            )}
          </UploadPhotoArea>
          {/* 게시물 텍스트 입력 구간 */}
          <InputList>
            <div>
              <label>제목</label>
              <input
                type="text"
                value={inputTitle}
                maxLength={20}
                onChange={(e) => TitleInputHandle(e.target.value)}
                placeholder="제목을 작성해주세요. (필수 : 20자 이내)"
              />
            </div>
            <div>
              <label>한 줄 일기</label>
              <input
                type="text"
                value={inputDiary}
                maxLength={40}
                placeholder="이번 여행의 이야기를 남겨주세요."
                onChange={(e) => {
                  DiaryInputHandle(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label>날짜</label>
              <input
                type={"date"}
                value={inputDate}
                min={getToday()}
                onChange={(e) => {
                  setInputDate(e.target.value);
                  console.log("e.target.value => ", e.target.value);
                }}
              ></input>
            </div>
            <div className="Search_Address_Box">
              <label>장소</label>
              <input value={addressInput} readOnly />
              <SearchAddress searchAddressHandle={searchAddressHandle} />
            </div>
          </InputList>
          {/* 주소 입력 구간 > 지도 API */}
          {addressInput ? (
            <KakaoMap
              addressInput={addressInput}
              searchCoordinateHandle={searchCoordinateHandle}
            />
          ) : null}
        </section>
      </Body>
    </>
  );
}

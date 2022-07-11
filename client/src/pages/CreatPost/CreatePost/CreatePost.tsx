import axios, { AxiosResponse } from "axios";
// React-Router v5(useHistory) -> v6(useNavigate)
// import FormData from "form-data";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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

export default function CreatePostPage() {
  const navigate = useNavigate();
  const location: any = useLocation();
  // console.log("location.state => ", location.state);
  // 유저 정보를 스토어에서 가져옴
  const { username, profileImg, introduction } = useSelector(
    (state: RootState) => state.userReducer
  );
  // 모든 값이 입력되었는지 확인<boolean>
  const [isCompleted, setIsCompleted] = useState<boolean>(true);
  if (isCompleted === false) {
    console.log("모든 인풋값을 입력했나요? => ", isCompleted);
  } else {
    console.log("모든 인풋값을 입력했나요? => ", isCompleted);
  }
  // 저장된 토큰값을 가져온다. useSelector는 store에 저장된 state가 변경될 때,
  // 해당 state를 사용하는 UI를 즉시 변경시켜주는 구독 기능이 포함되어 있다.
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  // console.log("등록하기 accessToken => ", accessToken);
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
    // console.log("한 줄 일기 inputDiary => ", inputDiary);
  };
  // 게시물 날짜 state, Handle
  const [inputDate, setInputDate] = useState<any>("");
  console.log("게시물 날짜 inputDate => ", inputDate);

  // 사용자가 업로드한 사진 file들을 저장할 state, Handle
  const [files, setFiles] = useState<any[] | undefined[]>([]);
  console.log("[게시물 등록][사진 목록][배열] => ", files);

  const photoPath = (file: any) => {
    // 불변성을 지키기 위해 기존에 저장된 files의 복사본(newFiles)에서 작업을 진행한다.
    let newFiles = [...files];

    if (files.length === 5) {
      alert("더이상 등록 할 수 없습니다.");
    } else if (files.length + file.length > 5) {
      alert("5장까지만 등록 해 주세요.");
    } else if (newFiles.length < 5) {
      for (let i = 0; i < file.length; i++) {
        file[i].preview = URL.createObjectURL(file[i]);
        newFiles.push(file[i]);
      }
      // newFiles 재정의(선언)
      newFiles = newFiles.slice(0, 5);
      setFiles(newFiles);
      // console.log("지금 확인 중 files => ", files);
    }
  };

  const deletePhotoHandle = (path: string) => {
    const deleteNewFilesState = files.filter((file) => {
      return file.preview !== path;
    });
    console.log("deleteNewFilesState => ", deleteNewFilesState);
    setFiles(deleteNewFilesState);
  };

  // 주소 입력 state, Handle
  const [addressInput, setAddressInput] = useState("");
  const searchAddressHandle = (address: string) => {
    setAddressInput(address);
    setIsCompleted(true);
    console.log("addressInput => ", addressInput);
  };

  const [addressCoordinate, setAddressCoordinate] = useState<number[]>([]);

  const searchCoordinateHandle = (lat: number, log: number) => {
    let newCoordinate: number[] = [];
    newCoordinate.push(lat);
    newCoordinate.push(log);
    setAddressCoordinate(newCoordinate);
  };

  console.log("test_By_Chanmin => is files [0] =>", files[0]);
  const registerPost = async () => {
    // e.preventDefault();
    if (
      inputTitle !== "" &&
      inputDiary !== "" &&
      inputDate !== "" &&
      addressInput !== "" &&
      files.length !== 0
    ) {
      let formData = new FormData();
      // console.log("axios할 formData => ", formData.values());
      // for (let i in files) {
      //   formData.append(`image${i}`, files[i]);
      // }
      files.forEach((file) => formData.append("image", file));
      formData.append("address", addressInput);
      formData.append("title", inputTitle);
      formData.append("diary", inputDiary);
      formData.append("day", inputDate);
      formData.append("latitude", `${addressCoordinate[0]}`);
      formData.append("longitude", `${addressCoordinate[1]}`);
      for (let key of formData.keys()) {
        console.log(key);
      }
      console.log("formData= >", formData);
      console.log("--------------------------------");
      for (let value of formData.values()) {
        console.log(value);
      }
      // files.forEach((file) => formData.append("image", file)); // files state에 저장 된 사진 정보를 담는다.
      // for (let value of formData.values()) {
      //   console.log(value); // 이미지 객체의 정보
      // }
      const result: any = await axios.post(
        `${process.env.REACT_APP_API_URL}/plan`,
        formData,
        // formData의 형태
        //   {image: file, Diary: "한 줄 일기", Date: "여행날짜", Hashtag: "#어려워", address: "주소" }
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // useSelector로 store에 저장된 토큰 값을 가져와야함
            "Content-Type": "multipart/form-data",

            withCredentials: true,
          },
        }
      );
      if (result) {
        window.scrollTo({ top: 0, left: 0 });
        navigate("/showAllPage");
      }
      // .then((res) => console.log("axiso.post.then(res)", res))
      // .catch((err) => console.log("axiso.post.then(err)", err));
      // console.log("axiso.post    :  result => ", result);
      // formDataAxioseResult === {postId: number, message: "게시물이 생성되었습니다."}
    } else {
      setIsCompleted(false);
    }
  };
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
                  profileImg
                    ? !profileImg.includes(":")
                      ? `${process.env.REACT_APP_API_URL}/uploads/${profileImg}`
                      : `${profileImg}`
                    : `../images/defaultImg.jpg`
                }
                alt="Profile"
              />
            </div>
            <div className="pfTxt">
              <p className="name">{!username ? "닉네임" : username}</p>
              <p className="intro">
                {!introduction ? "한 줄 소개" : introduction}
              </p>
            </div>
          </InfoBox>
          {/* 등록 & 취소 btn*/}
          <Buttons>
            {/* axios 요청 메시지 */}
            {!isCompleted ? (
              <p className="alert">필수 항목을 모두 입력해 주세요.</p>
            ) : null}
            <button onClick={(e) => registerPost()}>등록하기</button>
            <button onClick={(e) => navigate("/")}>취소하기</button>
          </Buttons>
        </div>
        <section>
          {/* 사진 업로드 구간 -------------------------------------*/}
          <UploadPhotoArea>
            <div className="thumbs">
              {files.length === 0 ? (
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

              {files.map((file: any, idx: any) => {
                return (
                  <div
                    key={`${file.preview}+${idx}`}
                    id={file.preview}
                    className="thumb"
                  >
                    <button
                      className="delete"
                      onClick={() => deletePhotoHandle(file.preview)}
                    ></button>
                    {/* ../images/delet.svg 를 button 배경으로 심는다. */}
                    <img src={file.preview} alt="Upload_Photo" />
                  </div>
                );
              })}
            </div>
            {files.length < 5 ? (
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
              <input type="text" value={inputDiary} maxLength={40}
              placeholder="이번 여행의 이야기를 남겨주세요."
              onChange={(e)=> { DiaryInputHandle(e.target.value);}}></input>
            </div>
            <div>
              <label>날짜</label>
              <input
                type={"date"}
                value={inputDate}
                min={getToday()}
                onChange={(e) => {
                  setInputDate(e.target.value);
                  setIsCompleted(true);
                  console.log("e.target.value => ", e.target.value);
                }}
              ></input>
            </div>
            <div className="Search_Address_Box">
              <label>장소</label>
              <input value={addressInput} 
              placeholder="우측의 버튼을 눌러 주소지를 검색해 주세요."
              readOnly />
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

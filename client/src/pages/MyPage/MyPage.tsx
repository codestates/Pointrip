import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//  https://dololak.tistory.com/147 리다이렉트 권한 부여
import { RootState } from "../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { setTapName } from "../../reducers/myPageReducer"; // 탭 이름을 변경할 reducer

import DefaultHeader from "../../layouts/header/index";
import MyPost from "./MyPost/MyPost";
import MyFavoritePost from "./MyFavoritePost/MyFavoritePost";
import EditProfile from "./EditProfile/EditProfile";

import { Body, Aside, Tablist, Tabpanel } from "./Mypage.style";

// useSelector;

export default function MyPages() {
  // const location: any = useLocation();
  // console.log("location.state => ", location.state);
  const dispatch = useDispatch();
  // store에 저장된 로그인유무 확인 state를 불러와 로그인 되었는지 확인한다.
  const { isLogin } = useSelector((state: RootState) => state.authReducer);

  // "회원 탈퇴" 버튼을 클릭하면, state<boolean>가 변경되고 state를 구독하는  계정 삭제 component가 활성화 되도록 설정
  // isOpened === false 일때는
  // 회원 탈퇴 버튼을 클릭하지 않은 상황이다.
  // isOpened === true 라면,
  // 회원 탈퇴 버튼을 클릭했으므로, isOpened를 구독하는 DeleteAccount component를 활성화 시킨다.
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // store(state.userReducer)에서 가져올 사용자 정보
  const {
    id,
    username, // 프로필
    profileImg, // 프로필 사진
    introduction, // 프로필 소개
    myPost, // 내가 작성한 게시물 개수
    myStorage, // 내가 찜한 게시물 개수
    // loginType, //
  } = useSelector((state: RootState) => state.userReducer);
  console.log("[마이페이지][id] => ", id);
  console.log("[마이페이지][profileImg] => ", profileImg);
  console.log("[마이페이지][introduction] => ", introduction);
  console.log("[마이페이지][myPost] => ", myPost);
  console.log("[마이페이지][myStorage] => ", myStorage);

  // 스토어에 저장된 탭의 이름을 불러온다
  const { tapName } = useSelector((state: RootState) => state.myPageReducer);

  // 선택한 탭의 이름을 스토어에 저장한다. dispatch로 변경할 탭이름을 payload로 갖는 액션을 호출 ->  myPageReducer의 탭이름을 변경하는 reducer 호출 =>
  const handleTapBtn = (tapName: string) => {
    dispatch(setTapName(tapName));
  };

  // 사용자의 찜하기 기능을 추적하기 위한 storage 상태
  const [userStorage, setUserStorage] = useState<number>(myStorage);

  useEffect(() => {
    setUserStorage(myStorage);
  }, [userStorage]);

  const scrollHandler = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <>
      <DefaultHeader />
      <Body>
        <Aside>
          <div className="profile">
            {/* 프로필 사진 */}
            <div className="pfImg">
              <img
                src={
                  profileImg
                    ? !profileImg.includes(":")
                      ? `${process.env.REACT_APP_API_URL}/uploads/${profileImg}`
                      : `${profileImg}`
                    : `../images/defaultImg.jpg`
                }
                alt="pfImg"
              />
              <div>
                <p>{username ? username : "닉네임"}</p>
                <p>
                  {introduction
                    ? introduction
                    : "프로필 설정에서 인사말을 설정 해 보세요"}
                </p>
              </div>
            </div>
            {/* 사용자가 가진 데이터(작성된 게시글, 찜한 게시글) */}
            <ul className="counts">
              {/* 사용자가 작성한 게시글 현황 */}
              <li>
                <p>
                  {myPost}
                  <br />
                  여행일정
                </p>
              </li>
              {/* 사용자가 찜한 게시글 현황 */}
              <li>
                <p>
                  {userStorage}
                  <br />
                  찜한일정
                </p>
              </li>
            </ul>
          </div>
          <Tablist>
            <button
              className={tapName === "MyPost" ? "clicked" : ""}
              onClick={() => {
                handleTapBtn("MyPost");
              }}
            >
              {username} 님의 여행 일정
            </button>
            <button
              className={tapName === "MyFavoritePost" ? "clicked" : ""}
              onClick={() => {
                handleTapBtn("MyFavoritePost");
              }}
            >
              {username} 님의 찜한 일정
            </button>
            <button
              className={tapName === "EditProfile" ? "clicked" : ""}
              onClick={() => {
                handleTapBtn("EditProfile");
              }}
            >
              프로필 설정
            </button>
          </Tablist>
        </Aside>
        <Tabpanel>
          {tapName === "MyPost" ? <MyPost /> : null}
          {tapName === "MyFavoritePost" ? <MyFavoritePost /> : null}
          {/* {tapName === "MyFavoritePost" ? (
            <MyFavoritePost userStorage={userStorage} />
          ) : null} */}
          {tapName === "EditProfile" ? <EditProfile /> : null}
          {/* <EditProfile /> */}
        </Tabpanel>
      </Body>
    </>
  );
}

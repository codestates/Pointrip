import PostCard from "../../../components/PostCard/PostCard";
import { RootState } from "../../../reducers/rootReducer";
import { useNavigate } from "react-router";
import Loading from "../../../components/Loading/Loading";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Gallery } from "../mypageTab.style";
import storageInfo2 from "./data";
import { v1 as uuid } from "uuid";

// function MyFavoritePost(userStorage: any) {
function MyFavoritePost() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 스토어에 저장된 정보를 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const { id, myStorage, username, profileImg } = useSelector(
    (state: RootState) => state.userReducer
  );
  console.log("[마이페이브릿포스트][myStorage] => ", myStorage);
  console.log("[마이페이브릿포스트][username] => ", username);
  // console.log("[마이포스트][introduction] => ", introduction);
  console.log("[마이마이페이브릿포스트스트][profileImg] => ", profileImg);
  console.log("[마이페이브릿포스트][id] => ", id);
  // postInfo === [
  //   {
  //     postid: 1,
  //     image1: "https://pointrip-image.s3.amazonaws.com/1655060197552png",
  //     username: "배상건",
  //     title: "제목1 입니다.",
  //     storage: [{userId: 1}, {userId: 2}, {userId: 3}]
  //   },
  //   {
  //     postid: 2,
  //     image1: "https://pointrip-image.s3.amazonaws.com/2231060197552png",
  //     username: "배상건",
  //     title: "제목2 입니다.",
  //     storage: [{userId: 1}, {userId: 2}, {userId: 3}]
  //   },
  //   {
  //     postid: 3,
  //     image1: "https://pointrip-image.s3.amazonaws.com/1655060197552png",
  //     username: "배상건",
  //     title: "제목3 입니다.",
  //     storage: [{userId: 1}, {userId: 2}, {userId: 3}]
  //   }
  // ]

  // 내가 찜한 게시물의 정보를 담을 배열
  const [storageInfo, setStorageInfo] = useState<any[]>([]);

  // 내가 찜한 게시물를 받아오는 axios 요청
  const getMyStorageData = async () => {
    setIsLoading(true);

    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/bookmark`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // response
    // {
    //   postId: 1
    //   image1: "",
    //   username: "배상건",
    //   title: "제목1 입니다.",
    //   storage: [{userId: 1}, {userId: 2}, {userId: 3}]
    // }
    if (result !== undefined) {
      setStorageInfo(result.data);
      setIsLoading(false);

    }
  };

  // 닉네임이나 프로필이미지가 바뀌면 포스트카드에 변경 사항을 반영
  // 마이페이지에서 변화된 userStorage가 감지되었을 경우 변경 사항 반영
  useEffect(() => {
    // if (
    //   myStorage !== 0 ||
    //   (userStorage.userStorage !== myStorage && userStorage.userStorage !== 1)
    // ) {
    getMyStorageData();
    // }
    // }, [username, profileImg, userStorage]);
  }, [username, profileImg]);

  return (
    <Gallery>
      {/* 내가 작성한 게시물이 없을 경우-기준 RootState의 myPost */}
      {isLoading ? (
        <Loading></Loading>
        ) : (storageInfo.length === 0 || storageInfo === undefined ? (
        <div className="unRendered">
          <p>찜하신 게시글이 없습니다.</p>
          <button onClick={() => navigate("/showAllPage")}>
            게시글 찜하러 가기
          </button>
        </div>
      ) : (
        // data === postInfo
        storageInfo.map((storageInfo, idx) => {
          return <PostCard key={uuid()} idx={idx} postInfo={storageInfo} />;
        })
      ))}
    </Gallery>
  );
}

export default MyFavoritePost;

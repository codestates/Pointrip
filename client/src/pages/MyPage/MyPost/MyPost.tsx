import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { RootState } from "../../../reducers/rootReducer";
import Loading from "../../../components/Loading/Loading";

import { useSelector } from "react-redux";
import axios from "axios";
import { Gallery } from "../mypageTab.style";
import PostCard from "../../../components/PostCard/PostCard";
import postInfo2 from "./data";
import { v1 as uuid } from "uuid";

export default function MyPost() {
  console.log(postInfo2);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. 내가 작성한 게시물의 정보를 서버로부터 받아오기 위해 axios.get 사용
  //  1) 이를 진행하기 위해, accessToken이 필요
  //  2) 스토어에서 accessToken을 가져옴
  //  3) axios.get 요청의 헤더에 가져온 accessToken을 담아 본인 인증을 수행한다
  //  4) 내가 작성한 게시물의 정보가 서버로부터 도착한다면,
  //  5) 도착한 응답 데이터를 배열로 관리하는 "내가 작성한 게시물 state"에 최신화한다.
  // 2.  "내가 작성한 게시물 state" 유무에 따라 페이지 구성이 달라져야 한다.
  //  a.  "내가 작성한 게시물 state"이 0일 때(작성된 게시물이 없을 때)
  //     1) 작성된 게시물이 없다는 것은,
  //     2) axios 응답으로 들어온 데이터가 존재하지 않는 다는 것을 의미한다.
  //     3) 따라서, "내가 작성한 게시물 state"로 게시물 작성 유무를 판단하지 않고,
  //     4) 내가 작성한 게시물을 number 타입으로 보관하는 RooState의 myPost를 기준으로 판단한다.
  //     2) CardContainer 내에  "작성하신 게시물이 없습니다."라는 메세지를 뛰운다.
  //  b.  "내가 작성한 게시물 state"이 존재한다면,
  //     1)  "내가 작성한 게시물 state"의 모든 게시물에 대해,
  //     2) PostCard 컴포넌트로 출력한다.

  // 스토어에서 accessToken을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  //스토어에서 저장된 나의 정보를 가져온다
  const { id, myPost, username, profileImg } = useSelector(
    // id === 가입된 순서대로 DB에서 부여하는 사용자 고유 값
    (state: RootState) => state.userReducer
  );
  console.log("[마이포스트][id] => ", id);
  console.log("[마이포스트][profileImg] => ", profileImg);
  // console.log("[마이포스트][introduction] => ", introduction);
  console.log("[마이포스트][myPost] => ", myPost);
  console.log("[마이포스트][username] => ", username);
  // axios로 받아온 내가 쓴 게시물의 정보를 담을 배열 state
  // 내가 쓴 게시물의 정보를 담을 배열
  // 객채(각 게시물의 정보)를 요소로 갖는 postInfo Array state
  const [postInfo, setPostInfo] = useState<any[]>([]);
  console.log("[MyPost][axios 응답][목록] => ", postInfo);
  // postInfo === [
  //   {
  //     postId: 1,
  //     image1: "https://pointrip-image.s3.amazonaws.com/1655060197552png",
  //     username: "배상건",
  //     title: "제목1 입니다.",
  //     storage: [{userId: 1}, {userId: 2}, {userId: 3}]
  //   },
  //   {
  //     postId: 2,
  //     image1: "https://pointrip-image.s3.amazonaws.com/2231060197552png",
  //     username: "배상건",
  //     title: "제목2 입니다.",
  //     storage: [{userId: 1}, {userId: 2}, {userId: 3}]
  //   },
  //   {
  //     postId: 3,
  //     image1: "https://pointrip-image.s3.amazonaws.com/1655060197552png",
  //     username: "배상건",
  //     title: "제목3 입니다.",
  //     storage: [{userId: 1}, {userId: 2}, {userId: 3}]
  //   }
  // ]
  // 내가 쓴 게시물의 정보를 받아오기 위한 axios 요청
  const getMyPostData = async () => {
    setIsLoading(true);
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/plan/myPost`, // id === 가입된 순서대로 DB에서 부여하는 사용자 고유 값
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(
      "[MyPost][내가 작성한 게시물 목록] result.data => ",
      result.data
    );
    if (result !== undefined) {
      setPostInfo(result.data);
      console.log("postInfo ===> ", postInfo);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (myPost !== 0) {
      getMyPostData();
    }
  }, [username, profileImg]);

  return (
    <Gallery>
      {/* 내가 작성한 게시물이 없을 경우-기준 RootState의 myPost */}
      {isLoading ? (
        <Loading></Loading>
      ) : (postInfo.length === 0 || postInfo === undefined? (
        <div className="unRendered">
          <p>작성하신 게시글이 없습니다.</p>
          <button onClick={() => navigate("/createPostPage")}>
            게시글 작성하러 가기
          </button>
        </div>
      ) : (
        // data === postInfo
        postInfo.map((postInfo, idx) => {
          return (
            <PostCard key={postInfo.postid} idx={idx} postInfo={postInfo} />
          );
        })
      ))}
      
    </Gallery>
  );
}

// postInfo.map 에서 postInfo는
// [
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

// [
//   {
//     postId: 1,
//     title: "6번째 게시물",
//     image1: "image111aaa",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 3,
//     title: "제목입니다.",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655174961510png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 4,
//     title: "제목입니다.",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655174999997png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 5,
//     title: "ssdfsdf",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655182661987png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 6,
//     title: "ssdfsdf",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655182735657png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 7,
//     title: "ssdfsdf",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655182739997png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 8,
//     title: "ssdfsdf",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655182764462png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 9,
//     title: "ssdfsdf",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655182776290png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 10,
//     title: "ssdfsdf",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655182955954png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 11,
//     title: "제목입니다.",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655184635970png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 12,
//     title: "ㄴㅇㄹㄴㅇ",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655187113004png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 13,
//     title: "ㄴㅇㄹ",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655187171392png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 14,
//     title: "타이블입니다.",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655188736495png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 15,
//     title: "asdas",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655188887778png",
//     username: "배상건이에에요안녕",
//   },
//   { postId: 16, title: "제목제목", image1: "", username: "배상건이에에요안녕" },
//   {
//     postId: 17,
//     title: "ㄴㅇㄹㄴㅇㄹ",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655192371540png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 18,
//     title: "sdfs",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655227813652png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 19,
//     title: "sdfs",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655227817558png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 20,
//     title: "sdfs",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655228160936png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 21,
//     title: "sdfgs",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655228386745png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 22,
//     title: "ㄴㅇㄹㄴㅇ",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655281550814png",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 23,
//     title: "2022.06.15.수",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655291310344jpg",
//     username: "배상건이에에요안녕",
//   },
//   {
//     postId: 24,
//     title: "asfad",
//     image1:
//       "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655291754358jpg",
//     username: "배상건이에에요안녕",
//   },
// ];

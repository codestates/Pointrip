import { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers/rootReducer";
import { setLogOut } from "reducers/authReducer";
import { setUser } from "reducers/userReducer";
import { AppDispatch } from "store/store";
import Loading from "../../components/Loading/Loading";
import { v1 as uuid } from "uuid";
import axios from "axios";

import data from "./data";
import DefaultHeader from "../../layouts/header/index";
import PostCard from "../../components/PostCard/PostCard";

import { Body, Gallery } from "./ShowAll.style";

// const breakpoints = {
//   "480": 2,
//   "768": 4,
//   "1024": 6,
//   "1280": 8
// };

export default function ShowAll() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState({
    preview: false,
    previewUrl: "",
  });

  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );
  // postInfo(state)
  const [postInfo, setPostInfo] = useState<any[]>([]);
  console.log(
    "[모아보기]][axios 응답][작성된 모든 게시물 목록][postInfo] => ",
    postInfo
  );
  const [preview, setPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewDetail, setPreviewDetail] = useState("");

  const settingPreview = (id: any) => {
    setPreview(true);
    setPreviewUrl(data[id].image1);
    setPreviewDetail(data[id].username);
  };

  const cancelPreview = () => {
    setPreview(false);
  };

  const getInitPostData = async () => {
    setIsLoading(true);
    const result: any = await axios.get(
      `${process.env.REACT_APP_API_URL}/plan/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "[모아보기][작성된 모든 게시물 정보 가져오기] => ",
      result.data
    );
    if (result !== undefined) {
      setPostInfo(result.data);
    }
    // setTimeout(() => {
    setIsLoading(false);
    // }, 5000);
  };

  useEffect(() => {
    getInitPostData();
  }, []);

  // isLogin이 true일 때 만, user 정보를 요청
  useEffect(() => {
    if (isLogin) {
      dispatch(setUser(accessToken));
    }
  }, [isLogin]);

  return (
    <>
      <DefaultHeader />
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <Body>
          <div className="title">
            <h3>모두보기</h3>
            <h4>
              보고 싶은 게시물을
              <br />
              선택해 주세요.
            </h4>
          </div>
          <Gallery>
            {/* 내가 작성한 게시물이 없을 경우-기준 RootState의 myPost */}
            {
              // !postInfo.length || postInfo === undefined ? (
              //   <div>
              //     <p>작성하신 게시글이 없습니다.</p>
              //     <button onClick={() => navigate("/createPostPage")}>
              //       게시글 작성하러 가기
              //     </button>
              //   </div>
              // ) : (
              // data === postInfo
              postInfo.map((postInfo, idx) => {
                return (
                  <PostCard
                    key={postInfo.postid}
                    idx={idx}
                    postInfo={postInfo}
                  />
                );
              })
              // )
            }
          </Gallery>
        </Body>
      )}
    </>
  );
}

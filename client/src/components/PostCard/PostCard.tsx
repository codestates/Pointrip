import NeedLogin from "../Modals/NeedLogin/NeedLogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RootState } from "../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { v1 as uuid } from "uuid";

import {
  setPlusMyStorage,
  setMinusMyStorage,
} from "../../reducers/userReducer";
import { Item } from "./PostCard.style";

interface Result {
  postInfo: any;
  idx: number;
}

export default function PostCard({ postInfo, idx }: Result) {
  let navigate = useNavigate();

  const submitStateHandler = () => {
    navigate("/detail", {
      state: { postId: postInfo.postId },
    })
    window.scrollTo({ top: 0, left: 0 })}
    ;


  const dispatch = useDispatch();
  // 로그인이 필요합니다 모달창
  console.log("[포스트카드][내부][해당 카드의 정보][postInfo] => ", postInfo);
  console.log(
    "[포스트카드][내부][해당 카드의 정보][postInfo][id] => ",
    postInfo.postId
  );
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );
  let { id } = useSelector((state: RootState) => state.userReducer);

  if (!isLogin) {
    id = 0;
  }
  // images중에 1번째 사진을 썸네일로 사용하고 사진개수만큼 circle을 추가 해주기위해 배열 생성
  // let images: string[] = postInfo.imagePath.split(",");

  // 좋아요 상태
  const [isLike, setIsLike] = useState<boolean>();

  // *** props로 받아온 postInfo는 객체임. map쓸 수 없음.
  // if (postInfo.storages !== undefined) {
  useEffect(() => {
    postInfo.storage.map((user: any) => {
      if (user.userId === id) {
        setIsLike(true);
      }
      if (id === 0) {
        setIsLike(false);
      }
    });
  }, [isLogin]);
  // }

  const likeHandle = () => {
    if (isLogin) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/bookmark`,
        data: { postId: postInfo.postId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            axios({
              method: "delete",
              url: `${process.env.REACT_APP_API_URL}/bookmark`,
              data: { postId: postInfo.postId },
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }).then((res) => {
              setIsLike(false);
              dispatch(setMinusMyStorage());
            });
          }
          setIsLike(true);
          if (res.status === 201) {
            dispatch(setPlusMyStorage());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsOpened(true);
    }
  };

  

  return (
    <>
      {isOpened ? (
        <NeedLogin setIsOpened={(bool: boolean) => setIsOpened(bool)} />
      ) : null}
      <Item className="item"  onClick={() => submitStateHandler()}>
        {/* <Link
          to={"/detail"}
          state={{ postId: postInfo.postid }}
          onClick={() => scrollHandler()}
        > */}
        <img
          className="PostCardImg"
          // 무슨 로직인지 모르겠음..
          src={postInfo.image1}
          // {!postInfo.image1 ? `${process.env.REACT_APP_API_URL}${images[0].slice(6)}`:`${postInfo.image1}` }
          alt="unsplash"
        />
        {/* </Link> */}
        <div className="detail">
          <p>{postInfo.username}</p>
          {postInfo.title}
          <svg>
            <path
              d="M15.2246 2.98517C14.989 2.43961 14.6493 1.94523 14.2244 1.5297C13.7993 1.11293 13.298 0.781735 12.7479 0.554114C12.1774 0.317149 11.5656 0.195856 10.9479 0.197278C10.0813 0.197278 9.23574 0.434583 8.50098 0.882825C8.3252 0.990052 8.1582 1.10783 8 1.23615C7.8418 1.10783 7.6748 0.990052 7.49902 0.882825C6.76426 0.434583 5.91875 0.197278 5.05215 0.197278C4.42812 0.197278 3.82344 0.316809 3.25215 0.554114C2.7002 0.78263 2.20273 1.11134 1.77559 1.5297C1.35019 1.94476 1.01037 2.43926 0.775391 2.98517C0.531055 3.55294 0.40625 4.15587 0.40625 4.77638C0.40625 5.36173 0.525781 5.97169 0.763086 6.5922C0.961719 7.11075 1.24648 7.64865 1.61035 8.19181C2.18691 9.05138 2.97969 9.94787 3.96406 10.8567C5.59531 12.3631 7.21074 13.4037 7.2793 13.4459L7.6959 13.7131C7.88047 13.8309 8.11777 13.8309 8.30234 13.7131L8.71895 13.4459C8.7875 13.402 10.4012 12.3631 12.0342 10.8567C13.0186 9.94787 13.8113 9.05138 14.3879 8.19181C14.7518 7.64865 15.0383 7.11075 15.2352 6.5922C15.4725 5.97169 15.592 5.36173 15.592 4.77638C15.5938 4.15587 15.4689 3.55294 15.2246 2.98517Z"
              fill={isLike ? "red" : "#ccc"}
              onClick={() => likeHandle()}
            />
          </svg>
        </div>
      </Item>
    </>
  );
}

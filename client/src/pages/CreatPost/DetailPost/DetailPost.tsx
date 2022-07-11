import { DeleteIcon, EditPencilIcon, LikeIcon } from "../../../icons/Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
// import DeletePost from "../../../components/Modals/DeletePost/DeletePost";
import DefaultHeader from "../../../layouts/header/index";
import { useLocation } from "react-router";
import { isMineTrue, isMineFalse } from "../../../reducers/isMineReducer";
import DeletePost from "../../../components/Modals/DeletPost/DeletPost";
import NeedLogin from "../../../components/Modals/NeedLogin/NeedLogin";
import KakaoMap from "../../../components/KakaoMap/KakaoMap";
import { Link, useNavigate } from "react-router-dom";

import {
  Body,
  InfoBox,
  Buttons,
  UploadPhotoArea,
  InputList
} from "../Create&Edit&Detail.style";

import {
  setPlusMyStorage,
  setMinusMyStorage,
} from "../../../reducers/userReducer";

interface PostDataType {
  address: string;
  day: string;
  diary: string;
  id: number; // DB: user_id
  image1: null | string;
  image2: null | string;
  image3: null | string;
  image4: null | string;
  image5: null | string;
  introduction: null | string;
  postId: number; // DB: plan_id
  postLike: number;
  profileImg: null | string;
  storage: null | any;
  title: string;
  username: string;
}

function DetailPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate("/editpost", { state: { postData } });
    console.log("수정 아이콘 postData => ", postData);
  };

  let { id } = useSelector((state: RootState) => state.userReducer);
  // console.log("[state.userReducer][id] => ", id);
  const { isLogin, accessToken } = useSelector(
    (state: RootState) => state.authReducer
  );
  if (!isLogin) {
    id = 0;
  }
  let { isMine } = useSelector((state: RootState) => state.isMineReducer);

  let location: any = useLocation();
  // console.log("[상세페이지][location] => ", location);
  console.log("[상세페이지][location][state] => ", location.state);
  // console.log("[상세페이지][location][state.id] => ", location.state.postId);
  // 로그인이 필요합니다 모달창
  // 로그인을 하지 않았다면, true로 변경되어 로그인을 유도한다.
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // 게시글 정보
  const [postData, setPostData] = useState<PostDataType>();

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string>("");
  const [delTargetId, setDelTargetId] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  // console.log("likes => ", likes);

  // image(1~5)의 배열과 Handle에서 사용할 인덱스 state
  const [images, setImages] = useState<string[]>([""]);
  console.log("images => ", images);
  // console.log("images[0] 33 => ", images[0]);
  const [imagesSelect, setImagesSelect] = useState<number>(0);
  console.log("시작 imagesSelect => ", imagesSelect);

  interface Storage {
    userId: number;
  }
  // 해당 게시물을 찜한 사용자의 userId(객체 프러퍼티)로 구성된 배열 상태
  const [storageList, setStorageList] = useState<Storage[]>([]);
  // sotrageList === [{"userId": 3}, {"userId": 4},{"userId": 2}]
  // console.log(
  //   "[상세페이지][현재 게시물에 찜한 유저 목록][배열][객체요소][userId: number] => ",
  //   storageList
  // );

  const initSet = async () => {
    let imagesArr: string[] = [];
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/plan/postId=${location.state.postId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: any) => {
        console.log("----------- res=> ", res);
        console.log(
          "+++++++++수정 아이콘 postData  res.data.day => ",
          res.data.day.split("T")[0]
        );
        // console.log("res.data => ", res.data);
        // console.log("res.data.id => ", res.data.id);
        if (res.data.id === id) {
          dispatch(isMineTrue());
        } else {
          dispatch(isMineFalse());
        }
        res.data.day = res.data.day.split("T")[0];
        // res.data.day.split("T")[0]
        setPostData(res.data); // 서버 통신 후 확인 필요

        setLikes(res.data.postLike); // 해당 게시물에 대한 찜한 횟수
        console.log("res.data => ", res.data);
        // console.log("res.data.image2 => ", res.data.image2);
        // console.log("res.data.image3 => ", res.data.image3);
        if (res.data.image1 !== null) {
          imagesArr.push(res.data.image1);
        }
        if (res.data.image2 !== null) {
          imagesArr.push(res.data.image2);
        }
        if (res.data.image3 !== null) {
          imagesArr.push(res.data.image3);
        }
        if (res.data.image4 !== null) {
          imagesArr.push(res.data.image4);
        }
        if (res.data.image5 !== null) {
          imagesArr.push(res.data.image5);
        }
        // console.log("imagesArr => ", imagesArr);
        setImages(imagesArr); //
        // console.log("images 22 => ", images);
        // console.log(
        //   "[상세페이지][initSet][이미지 객체][배열로 전환][images][push완료][images] => ",
        //   images
        // );
        // if (res.data.storages)
        console.log("res.data.storage => ", res.data.storage);
        setStorageList(res.data.storage);
        console.log("storageList => ", storageList);
      });
  };
  //   address: "그"
  // day: "2022-03-03T00:00:00.000Z"
  // diary: "너무재밌"
  // id: 2
  // image1: "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655108694313png"
  // image2: "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655108694321png"
  // image3: "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655108694357png"
  // image4: "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655108694360png"
  // image5: "https://pointrip-photo.s3.ap-northeast-2.amazonaws.com/1655108694367png"
  // introduction: null
  // postId: 2
  // postLike: 0
  // profileImg: null
  // storage: []
  // title: "폼데이터수"
  // username: "!!!!!!!!"
  const [isMyStorage, setIsMyStorage] = useState<boolean>(false);
  console.log("isMyStorage => ", isMyStorage);
  useEffect(() => {
    // 페이지 마운트 시에 post 정보 요청
    initSet();
  }, []);

  useEffect(() => {
    // 해당 게시물을 찜한 사용자의 userId 중, 작성자가 포함되어 있다면,
    // 작성자에게 노출되는 수정/삭제 아이콘을 노출 시킨다.
    if (storageList) {
      storageList.map((storage) => {
        console.log("storage => ", storage);
        if (storage.userId === id) {
          setIsMyStorage(true);
        }
      });
    }
  }, [storageList]);

  const deletePostHandle = (target: string, commentId: number): void => {
    setIsDeleteModal(!isDeleteModal);
    // console.log;
    setDeleteTarget(target);
    setDelTargetId(commentId);
  };

  const likeHandle = () => {
    if (postData !== undefined) {
      // 서버에 내 정보를 보내서, 해당 게시물을 찜할 것을 요청함
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/bookmark`,
        data: { postId: postData.postId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // 게시물 찜하기에 성공
          console.log("찜하기 요청 res => ", res);
          if (res.status === 201) {
            setIsMyStorage(true);
            dispatch(setPlusMyStorage());
            setLikes(likes + 1);
          } else if (res.status === 200) {
            axios({
              method: "delete",
              url: `${process.env.REACT_APP_API_URL}/bookmark`,
              data: { postId: postData.postId },
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }).then((res) => {
              setIsMyStorage(false);
              dispatch(setMinusMyStorage());
              setLikes(likes - 1);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 사진 좌우로 넘기는 Handle
  const imagesHandle = (name: string) => {
    if (name === "rightArrow" && imagesSelect < images.length - 1) {
      setImagesSelect(imagesSelect + 1);
      console.log(`오른쪽 imagesSelect =>`, imagesSelect);
      console.log(`오른쪽 images${imagesSelect} =>`, images[imagesSelect]);
      // console.log("rightArrow imagesSelect => ", imagesSelect);
      // console.log("[images[imagesSelect] => ", images[imagesSelect]);
    } else if (name === "leftArrow" && imagesSelect > 0) {
      setImagesSelect(imagesSelect - 1);
      console.log(`왼쪽 imagesSelect =>`, imagesSelect);
      console.log(`왼쪽 images${imagesSelect} =>`, images[imagesSelect]);
    }
  };

  return (
      <>
        <DefaultHeader />
        {/* server 오류가 나지 않을 때만 렌더된다.*/}
        {postData !== undefined ? 
          <Body>
            <div>
                {/* 유저 프로필 */}
                <InfoBox>
                  <div className="pfImg">
                  {/* 프로필 사진 이미지 데이터의 상태 :
                  유저가 프로필 사진을 등록하지 않았다면 기본 프로필 이미지를,
                  등록했다면 등록한 이미지를 보여줌.
                  컴퓨터에서 파일 이름에 특수문자 ":"를 넣을 수 없다는 점을 이용하여 소셜로그인시       저장된 프로필 사진인지, 열린집을 통해 업데이트한 사진인지 판별 */}
                  <img src={postData.profileImg ? 
                    (!postData.profileImg.includes(":") ?
                    (`${process.env.REACT_APP_API_URL}/uploads/${postData.profileImg}`) : (`${postData.profileImg}`) ) :
                    (`../images/defaultImg.jpg`)} alt="Profile" />
                  </div>
                  <div className="pfTxt">
                    <p className="name">
                      {!postData.username? "닉네임" : postData.username}</p>
                    <p className="intro">
                      {!postData.introduction ? "한 줄 소개": postData.introduction}</p>
                  </div>
                </InfoBox>
                <Buttons>
                  {/* 찜하기 아이콘 */}
                  <div className="like button" onClick={isLogin ? () => likeHandle() : () => setIsOpened(true) }>
                    {/* 로그인 상태일 때, 찜하기 버튼 클릭시, 
                    내 스토리지에 포함되었는지 확인(likeHandle)후 
                    찜하기 아이콘 색상 변경 */}
                    <div>
                      
                          <LikeIcon isCheck={isMyStorage} />
                          </div>
                      {/*
                      // 로그인 상태가 아니므로, 로그인 모달을 노출시킨다. */}
                        {/* 로그인되어 있지 않으므로, 찜하기 아이콘은 비활성화되있다. */}
                    <p>{likes}개</p>
                  </div>
                  {/* 게시물을 작성한 사용자가
                  현재 post를 열람 중 이라면,
                  수정/삭제 아이콘 노출 */}
                  {isMine ?
                    <>
                      <div className="Edit button" onClick={() => navigateHandler()}>
                        <div>
                          {/* 수정 아이콘 구역 */}
                          {/* <Link to={`/detail/editpost`} state={{ postData: postData }}>
                          </Link> */}
                            <div>
                              <EditPencilIcon color={"#2d2d2d"} />
                            </div>
                            <p>수정하기</p>
                        </div>
                      </div>
                      <div className="Delete button" onClick={() => deletePostHandle("post", postData.postId)}>
                        <div>
                          {/* 삭제 아이콘 구역 */}
                          <div
                            
                            >
                            <DeleteIcon color={"#2d2d2d"} />
                          </div>
                            <p>삭제하기</p>
                        </div>
                      </div>
                    </>
                  :
                    <></>
                  }
                </Buttons>
                {/* 한 줄 일기, 날짜, 장소, 지도 구역 ---- */}
                </div>
                <section>
                  {/* 사용자가 올린 사진 */}
                <UploadPhotoArea className="ovfHidden">
                    {images[0] !== "" ? (
                      <>
                        <div className="arrowBtns">
                          <img
                            className="arrowBtn"
                            src="../images/arrowLeft.svg"
                            alt="Photo_Slide_Left"
                            onClick={() => imagesHandle("leftArrow")}
                          />
                          <img
                            className="arrowBtn"
                            src="../images/arrowRight.svg"
                            alt="Photo_Slide_Right"
                            onClick={() => imagesHandle("rightArrow")}
                          />
                        </div>
                        <div className="photo">
                          <img
                            src={images[imagesSelect].slice(6)}
                            alt="Post_Photo"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          className="Photo_Slide_Button"
                          src="./images/arrowLeft.svg"
                          alt="Photo_Slide_Left"
                          onClick={() => imagesHandle("leftArrow")}
                        />
                        <div className="Photo">
                          <img src={"./images/noImage.svg"} alt="NoImg" />
                        </div>
                        <img
                          className="Photo_Slide_Button"
                          src="./images/arrowRight.svg"
                          alt="Photo_Slide_Right"
                          onClick={() => imagesHandle("rightArrow")}
                        />
                      </>
                    )}
                </UploadPhotoArea>
                  <InputList>
                    <div>
                      <label>제목</label>
                      <input value={postData.title} readOnly />
                    </div>
                    <div>
                      <label>한 줄 일기</label>
                      <input value={postData.diary} readOnly />
                    </div>
                    <div>
                      <label>날짜</label>
                      <input value={postData.day.split("T")[0]} readOnly></input>
                    </div>
                    <div className="Search_Address_Box">
                      <label>장소</label>
                      <input value={postData.address} readOnly />
                    </div>
                  </InputList>
                  <KakaoMap addressInput={postData.address} />
                </section>
                
            {/* 로그인 확인 Modal */}
            {isOpened ?
              <NeedLogin setIsOpened={(bool: boolean) => setIsOpened(bool)} />
            : null}
            {/* 삭제확인 Modal */}
            {isDeleteModal ? 
              <DeletePost
                setIsDeleteModal={setIsDeleteModal} // true
                delTargetId={delTargetId} // postData.postId
                deleteTarget={deleteTarget} // post
              />
             : 
              <></>
            }
          </Body>
        : 
          <Body>
          </Body>
        }
    </>
  );
}

export default DetailPost;

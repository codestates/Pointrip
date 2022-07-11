import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/rootReducer";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  ModalBackground,
  ModalContainer,
  TitleWrapper,
  Title,
  BtnContainer,
  OkayBtn,
  CancelBtn,
} from "../Modal.style";

interface IProps {
  setIsDeleteModal: (boolean: boolean) => void;
  deleteTarget: string;
  delTargetId: number;
}

function DeletePost({
  setIsDeleteModal,
  deleteTarget, // post
  delTargetId, // postId
}: IProps) {
  // 저장된 토큰값을 가져옴
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const [isSuccess, setIsSuccess] = useState(false);

  // 삭제 완료
  const submitDelete = async () => {
    const result = await axios.delete(
      // https://pointrip.net/post/:postId
      `${process.env.REACT_APP_API_URL}/plan/postId=${delTargetId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (result.status === 200) {
      // 포스트 삭제 했을 경우
      console.log("result.data.message => ", result.data.message); // message: "게시물이 삭제되었습니다"
      setIsSuccess(true);
    } else if (result.status === 404) {
      console.log("result.data.message => ", result.data.message); // message: "삭제하려는 게시물이 없습니다."
      setIsSuccess(false);
    }
  };

  return (
    <>
      {isSuccess && deleteTarget === "post" ? (
        <Navigate replace to="/showAllPage"></Navigate>
      ) : (
        <ModalBackground>
          <ModalContainer>
            <TitleWrapper>
              <Title>정말 삭제 하시겠습니까?</Title>
            </TitleWrapper>
            <BtnContainer>
              <OkayBtn className="deleteBtn" onClick={() => submitDelete()}>삭제</OkayBtn>
              <CancelBtn onClick={() => setIsDeleteModal(false)}>취소</CancelBtn>
            </BtnContainer>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
}

export default DeletePost;

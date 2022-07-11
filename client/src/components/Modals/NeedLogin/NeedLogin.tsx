import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

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
  setIsOpened: (bool: boolean) => void;
}
export default function NeedLogin({ setIsOpened }: IProps) {
  const navigate = useNavigate();

  return (
    <ModalBackground>
      <ModalContainer>
        <TitleWrapper>
          <Title>로그인이 필요합니다.</Title>
        </TitleWrapper>
        <BtnContainer>
          <OkayBtn 
          onClick={()=> navigate("/login")}>로그인</OkayBtn>
          {/* IsOpened(사용자 왈 : 로그인을 희망해요!)이 true일 때, NeedLogin 모달 오픈 */}
          <CancelBtn onClick={() => setIsOpened(false)}>
            취소
          </CancelBtn>
        </BtnContainer>
      </ModalContainer>
    </ModalBackground>
  );
}

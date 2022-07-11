import styled from "styled-components";

export const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 999;
  font-weight: 600;
  position: absolute;
`;

export const ModalContainer = styled.div`
  width: 24.75rem;
  height: 250px;
  background-color: #fdfbfe;
  border-radius: 25px;
  padding: 30px;
  margin-bottom: 100px;
  transition: 0.5s all;

  /* @media screen and (max-width: 37.5rem) {
    width: 13.938rem;
    height: 8.188rem;
    margin-bottom: 140px;
    transition: 0.5s all;
  } */
`;

export const TitleWrapper = styled.div`
margin: 80px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  transition: 0.5s all;
  /* @media screen and (max-width: 37.5rem) {
    margin-top: 3px;
    margin-bottom: 27px;
    transition: 0.5s all;
  } */
`;

export const Title = styled.span`
  font-size: 1.4rem;
  transition: 0.5s all;

  /* @media screen and (max-width: 37.5rem) {
    font-size: 0.75rem;
    transition: 0.5s all;
  } */
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;

  button{
    height: 43px;
    width: 145px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 15px;
  }
`;

export const OkayBtn = styled.button`
  transition: 0.5s all;

  &.deleteBtn{
    background-color: #cc3535;

  }

`;

export const CancelBtn = styled.button`
  background: #ccc;
  color: #2d2d2d;
  transition: 0.5s all;
  margin-left: 20px;

  /* @media screen and (max-width: 37.5rem) {
    font-size: 0.8rem;
    width: 4rem;
    height: 2.1rem;
    transition: 0.5s all;
  } */
`;

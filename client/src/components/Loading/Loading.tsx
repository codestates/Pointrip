import react from "react";
import { Background, LoadingText } from "./Loading.style";
import Spinner from "./spinner.gif";
export default function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src={Spinner} alt="Loading" width="5%"></img>
    </Background>
  );
}

import { Member } from "@types";
import Nav from "components/Nav/Nav";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "./header.style";
/**
 * 기본 Header
 * 해당 Header에서는 Login한 회원의 정보를 sessionStorage에서 가져와
 * Login한 회원의 정보를 보여주는 역할을 합니다.
 */
export default function DefaultHeader() {
  const [member, setMember] = useState<Member | null>(null);
  const navigate = useNavigate();

  // useEffect(()=>{
  //   if(sessionStorage.getItem('loginMember') !== null && sessionStorage.getItem('loginMember') !== '') {
  //     setMember(JSON.parse(sessionStorage.getItem('loginMember') as string) as Member);
  //   }
  // }, []);

  // Logout 버튼을 클릭했을시 작동하는 함수
  // const logoutHandler = () => {
  //   sessionStorage.setItem('isAuthenticated', 'false');
  //   sessionStorage.setItem('loginMember', 'null');
  //   setMember(null);
  //   navigate('/');
  // }

  return (
    <Header>
      <h1>
        <a href="/">Pointrip</a>
      </h1>
      <Nav />
    </Header>
  );
}

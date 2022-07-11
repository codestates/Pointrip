import { Outlet } from 'react-router'
import { LayoutDefaultProps } from '@types'
import { useNavigate } from 'react-router';
import {
  SignHeader
}from "./DefaultSign.style";
/**
 * interface LayoutDefaultPrps {
 *  children ?: React.ReactElement;
 * }
 */

export default function DefaultSignLayout({children}:LayoutDefaultProps) {
  
  const navigate = useNavigate();
  
  return (
    <div>
      <SignHeader>
        <h1>Pointrip</h1>
        <button onClick={()=>{
            navigate("/");
          }}>&#9001; 메인페이지로</button>
      </SignHeader>
        <main>
          {/* children이 있을경우는 children을 없을 경우에는 Outlet을 나타내준다 */}
          {children || <Outlet/>}
        </main>
      {/* 해당 layout에서 공통으로 사용되는 Footer를 선언해준다. */}
    </div>
  )
}
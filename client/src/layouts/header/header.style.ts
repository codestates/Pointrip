import styled from "styled-components";
export const Header = styled.header`
  background: #fff;
  position: fixed; 
  z-index: 10;
  display: inline-block; 
  width: 100%;
  height: 138px;
  box-shadow: 0px 30px 50px #fff,0px 15px 25px #fff;

  font-size: 20px;
  font-weight: 600;
  color: #186aa5;

  a{
    display: inline-block; 
    height:100%;
    padding: 26px;
  };
  h1{
  margin-left: 26px;

  }
  a, h1 {  
    line-height: calc(138px - 106px);
  }
  nav{
    display: inline-block; 
    position: absolute;
    right : 53px;


  }

`;
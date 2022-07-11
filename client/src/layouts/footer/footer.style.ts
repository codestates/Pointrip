import styled from "styled-components";

export const Footer = styled.footer`
height: 240px;
position: absolute;
display: inline-block; 
width: 100%;
bottom: -120px;
background-color: #d1e4f3;
margin: 0 auto;
/* 절대 수정하지 말 것. */
top: 98%;
    left: 50%;
    transform: translate(-50%, -50%);

h1{
  padding-top: 35px;
  display: block;
  font-size: 20px;
  text-align: center;
}
ul{
  width: 520px;
  margin: 27px auto;
  padding-left: 75px;
  li{
    margin-bottom: 13px;
    height: 16px;

    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: Montserrat;
    line-height: 1.25;
    color: #186aa5;

    span{
display: inline-block;
width: 210px;


    }
    a{
    display: inline-block;

    }
  }
}

`;

// .\- {
//   width: 411px;
//   
//   margin: 13px 0 13px 622px;
//   font-family: Montserrat;

//   font-stretch: normal;
//   font-style: normal;
//   
//   letter-spacing: normal;
//   text-align: left;
//   color: #186aa5;
// }
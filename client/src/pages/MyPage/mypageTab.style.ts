import styled from "styled-components";

export const Gallery=styled.div` 
// background-color:#ccc;
box-sizing: border-box;
padding:0 20px 20px 0;
height:701px;
margin: 0 auto;
display: grid;
grid-gap: 25px;
grid-template-columns:1fr 1fr 1fr;
// grid-auto-rows: 150px;
grid-auto-flow: row dense;
overflow-y: auto;
border-radius: 24px;
position: relative;
div.unRendered {
  /* grid의 방해를 받아서 넣어준 것 임. 지우면 안됨. */
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #d1e4f3;

  p {
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #186aa5;
    height: 80px;
    margin-top:250px;
  }
button {
  display: block;
  margin: 0 auto;
  height: 60px;
  width: 400px;
  font-size: 20px;
  font-weight: 600;
  background-color: #186aa5;
  color: #e8eff7;
}
}
`;


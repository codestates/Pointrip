import styled from "styled-components";

export const Body=styled.div` 
display: flex;
justify-content: center;
align-items: center;
position: relative;
width: 100%;
height: 100%;

background: #f5f4f4 !important;
font-size: 13px;

// font-family: 'Arvo', monospace;
@supports(display: grid) {
  display: block;
}

.title{
  padding-top: 201px;
  text-align: center;
  line-height:1.33;
  font-weight: bold;
h3{
  color: #186aa5;
  font-size: 60px;
  margin-bottom: 40px;
}
h4{
  font-size: 50px;

}
}

`;



export const Gallery=styled.div` 
padding:150px 0;
// background-color:#ccc;
margin: 0 auto;
width:1785px;
display: grid;
grid-gap: 32px;
grid-template-columns:1fr 1fr 1fr 1fr 1fr;
// grid-auto-rows: 150px;
grid-auto-flow: row dense;
`;

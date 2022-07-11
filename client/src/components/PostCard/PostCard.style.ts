import styled from "styled-components";

export const Item=styled.div` 
height: 450px;
position: relative;
display: flex;
flex-direction: column;
justify-content: flex-end;
box-sizing: border-box;
border-radius: 24px;
background-color:#f5f4f4;

&:hover .detail{
    color:#73a1c2;

  }
&:hover:after{
   display:none;

  }
  

// color: #fff;
grid-column-start: auto;
grid-row-start: auto;
color: #fff;
background-size: cover;
background-position: center;
box-shadow: 10px 10px 10px #e5ecf0;
transition: transform 0.3s ease-in-out;
cursor: pointer;
counter-increment: item-counter;
grid-row-end: span 2;
// grid-row-end: auto;
// height:350px;
overflow: hidden;
position:relative;

a{
    display:inline-blcok;
    height:100%;
    width:100%;
    position: absolute;
    z-index:5;
  }

img {
  position: absolute;
  // display:inline-blcok;
  height: 100%;
  top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

p{
  font-size: 12px;
  margin-bottom:10px;
}
svg{
  height: 15px;
  width: 15px;
  float:right;
}

&:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
  transition: opacity 0.3s ease-in-out;

}

&:hover {
  &:after {
    opacity: 0;
  }
 
}


.detail {
  position: relative;
  z-index: 1;
  padding: 25px;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 21px;
  color: #fff;

  /* className으로 조절하시오. */
  /* 
  &:before {
    content: "❤️";
    font-weight: bold;
    padding-right: 0.5em;
    color: #fff;
    position: absolute;
    right: 10px;
  } */

  
}


`;
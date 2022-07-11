import styled from "styled-components";
import background from "./mainpage.png";

export const Body = styled.div`
background-image: url(${background});
background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; 
height: 5628px;
width: 1920px;

margin: 0 auto;
position: relative;

button{
  position: absolute;
  display: inline-block;
  
  width:310px;
  height:70px;
  opacity: 0;
  cursor: pointer;

  
  &:nth-child(1){
    
    left: 326px;
    bottom: 3810px;

    
  @media screen and (max-width: 1920px) {
    left:21%;
    width: 25%;
    transform: translate(-50%, 0%) ;
  }

  }

  &:nth-child(2){
    
    left: calc(50% - 155px);
    bottom: 2735px;
  }
  
  &:nth-child(3){
    
    left:calc(50% - 155px);
    bottom : 620px;
  }




}

@media screen and (max-width: 1920px) {
  width:auto;
  }
`;
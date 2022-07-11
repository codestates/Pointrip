import styled from "styled-components";
import background from "./login.png";

export const BackGround = styled.div`
background-color: #e8eff7;
height: 100vh;
padding-bottom: 10px;
`;
export const Body = styled.div`
background-image: url(${background});
background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; 
height: 1080px;
width: 1920px;

margin: 0 auto;
position: relative;

@media screen and (max-width: 1920px) {
  width:auto;
}

.form{
  height: 350px;
  position: relative;
}

`;
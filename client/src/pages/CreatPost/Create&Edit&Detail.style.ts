import styled from "styled-components";

export const Body = styled.div`
padding-top:205px;
margin: 0 auto;
width:1280px;


&>div:nth-of-type(1){
  display:flex;
flex-direction: row;
justify-content: space-between;
}

section{
  margin: 30px 0 200px;
  padding: 30px 0 45px;
  box-sizing: border-box;
  width:100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
 
  .KakaoMap{
  /* margin-bottom: 380px; */
}
}

`;



export const InfoBox = styled.div`
height:142px;

.pfImg{
  box-sizing: border-box;
  display:inline-block;
  border: 4px solid #d1e4f3;
  height:142px;
  width:142px;
  border-radius: 50%;
  overflow: hidden;
  margin-right:30px;
  img{
    height:142px;
  width:142px;
  }
}

.pfTxt{
  height:100%;
  display: inline-block;
  /* box-sizing: border-box; */

  p:nth-child(1){
    display:block;
margin-bottom: 20px;

font-size: 20px;
font-weight: bold;
}
p:nth-child(2){
  display:inline-block;
  height:30px;
display:block;

      font-weight: bold;
      padding-bottom: 20px;
  }

}
`;
export const Buttons=styled.div` 
height:142px;
width : 600px;
position: relative;

button, .button {
float: right;
margin:99px 0 0 20px;
  height: 43px;
  width: 145px;
  font-size: 18px;
  background-color: #d1e4f3;
  color: #186aa5;
  font-weight: 600;
  border-radius: 15px;

  :hover {
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
  }
}

.button.like, .button.Edit, .button.Delete{
  background: none;
  position: relative;
  /* height: 25px; */
    width: 130px;
    margin: 123px 0 0 25px; 
    cursor: pointer;
  
  & div{
    display: inline-block;
    svg{
      height:25px;
      width:25px;
      
    }
  }
  & div:nth-child(1) {
    margin-right:20px;
  }

  & p{
    position: absolute;
    top: 3px;
    left: 35px;
  }
}

.alert{
  bottom: 55px;
  right: 0;
}

`;


export const UploadPhotoArea = styled.div`
height:648px;
position: relative;
margin-bottom: 120px;

width:100%;

&.ovfHidden{
  overflow: hidden;
}

.arrowBtns{
  position: absolute;
  display: flex;
   justify-content: space-between;
   bottom:0;
   width: 100%;
}

.photo {
  img{
  height:648px;
  display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    object-fit: contain;
  }

}
.plusBtn {
  input{
    bottom: -65px;
    position: absolute;
    right: 0;
    opacity: 0;
    cursor: pointer;
}
&::before{
    content: "사진 추가하기";
    right:0;
    bottom: -80px;
    text-align: center;
    line-height:43px;

    position: absolute;
    height: 43px;
    width: 160px;
    font-size: 18px;
    background-color: #d1e4f3;
    color: #186aa5;
    font-weight: 600;
    border-radius: 15px;
  }
  &:hover {
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
  }
}

.thumbs {
    margin-bottom: 15px;
}

.thumb {
  border-radius: 24px;

  display: inline-block;
  position: relative;
  overflow: hidden;
  box-shadow: 10px 10px 10px #e5ecf0;

  background-color:#eee;
  &.example{
    box-sizing: border-box;
  }
  
  button.delete {
    width:30px;
    height:30px;
    z-index: 10;
    right:10px;
    top:10px;
    position: absolute;
    background: center / contain no-repeat url(../images/delet.svg) ;
    filter: invert(78%) sepia(93%) saturate(2603%) hue-rotate(167deg) brightness(79%) contrast(85%);
    
  }

  img {
    position: absolute;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  &:nth-child(1) {
    height: 648px;
    width: 448px;
    left: 0;
  }
  
  &:nth-child(2),&:nth-child(3), &:nth-child(4), &:nth-child(5)  {
    position: absolute;
    height: 315px;
    width: 400px;
    margin:0 0 0 15px;
  }
  
  
  &:nth-child(3) {
    right: 0;
  }
  
  &:nth-child(4) {
    bottom:0;
  }
  
  &:nth-child(5) {
    right: 0;
    bottom:0;

  }
}
`;

export const InputList = styled.div`
display:flex;
justify-content: space-evenly;
flex-direction:column;
width:100%;
height: 465px;
.Search_Address_Box{
  position: relative;
}

label{
  display: inline-block ; 
width:175px;
font-size: 20px;
  font-weight: bold;
  color: #186aa5;
  
}

input{
  width: 1105px;
	font-size: 18px;
	box-sizing: border-box;
	padding:20px;
	letter-spacing:1.7px;
	border: solid 1px #73a1c2;
	color:#186aa5;
  border-radius: 20px;

&:hover {
  border-color: #719ECE;
  box-shadow: 0 0 10px #719ECE;
  
}

&:focus {
  outline: none !important;

}

&+button{
  position: absolute;
    height:63px;
    width:160px;
    right:0px;
    border-radius: 0 19px 19px  0;
    font-size: 18px;
    background-color: #d1e4f3;
    color: #186aa5;
    font-weight: 600;
}

&:hover+button{
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
}
::placeholder {
	color:#73a1c2;
  
}
}

p{
  box-sizing:border-box;
  padding: 10px 180px ;
}



`;



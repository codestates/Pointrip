import styled from "styled-components";
export const Body = styled.div`
box-sizing: border-box;
padding:35px 44px 0;
background-color: #f5f4f4;
border-radius: 24px;

h2{
font-size: 36px;
font-weight: bold;
text-align: center;
padding-bottom: 13px;
}
`;
export const Top = styled.div`
display:flex;
justify-content: space-between;
height:142px;
width: 100%;
position: relative;

&>button {
position: absolute;
right:0;
bottom:0;
height: 43px;
width: 145px;
font-size: 18px;
background-color:#d1e4f3;
color:#186aa5;
font-weight: 600;
border-radius: 15px;
  :hover{
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
  }
}

.pfImg{
img{
display: inline-block;
border: 4px solid #d1e4f3;
width:142px;height:142px;
border-radius: 50%;
margin-right:33px;

}
.pfNick{
display: inline-block;

p:nth-child(1){
font-size: 24px;
font-weight: bold;
padding: 10px 0;
}
p:nth-child(2){
font-size: 20px;
padding: 10px 0;
}


button{

display:block;
font-size: 14px;
color: #186aa5;
margin: 5px 0 5px;
padding: 0;
background: none;
}

label[for="image"] {
position: relative;
display: inline-block;
margin-right: 100px;
cursor: pointer;

}
input#picture {
opacity: 0;
position: absolute;
left: 0;
bottom: 0;
}
}
}
`;

export const InputList = styled.div`
display:flex;
justify-content: space-evenly;
flex-direction:column;
width:100%;
height: 465px;

label{
display: inline-block ;
width:175px;
font-size: 20px;
font-weight: bold;
color: #186aa5;

}

input{
width: 60px;
width: 787px;
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
::placeholder {
color:#73a1c2;

}
}

p{
box-sizing:border-box;
padding: 10px 180px ;
}

`;

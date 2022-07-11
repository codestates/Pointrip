import styled from "styled-components";

export const Body = styled.div`
padding-top: 203px;
margin: 0 auto;
width:1600px;
height:696px;
display:flex;
justify-content: space-between;


`;

export const Aside = styled.aside`
display: inline-block;
width: 477px;

.profile{
  height:328px;
  margin-bottom: 38px;
  border-radius : 25px;
  background-color: #f5f4f4;
  box-sizing: border-box;
  padding:49px 40px;

  .pfImg{
    height: 142px;
    display:flex;
    color:#186aa5;
    img{
      border: 4px solid #d1e4f3;
      height:100%;
      width:142px;
      border-radius: 50%;
      margin-right: 52px;
    }
    p:nth-child(1){
      padding:25.5px 0;
      font-size: 16px;
      font-weight: bold;
    }
    p:nth-child(2){
      width:155px;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.3;
    }
  }

  ul {
    li {
      display: inline-block;
      width: 50%;
      text-align: center;
      height: 80px;
      line-height: 1.7;

      p{
        padding: 40px 0;
        font-size: 19px;
        font-weight: bold;
        color: #186aa5;
      }
    }
  }
}

`;

export const Tablist = styled.div`
height: 328px;
display:flex;
flex-direction:column;
justify-content: space-between;

button {
  display:block;
  height:90px;
  width:100%;
  border-radius : 25px;
  background-color: #f5f4f4;
  color: #186aa5;
  font-size: 24px;
  font-weight: bold;


  &:hover, &.clicked{
	  transition: background 0.3s ease-in-out;
    background-color: #d1e4f3;
  }

}
`;
export const Tabpanel = styled.div`
display: inline-block;
width: 1050px;
border-radius : 25px;
/* border: solid 1px #707070; */
`;

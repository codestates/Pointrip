import { Request, Response } from 'express';
import 'dotenv/config';

const clientID = process.env.KAKAO_CLIENT_ID;
const redirectURI = process.env.KAKAO_REDIRECT_URI;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, res: Response) => {
  // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
  console.log(typeof req)
  console.log(typeof res)
  let code = req.body.authorizationCode
  console.log(clientID)
  console.log(clientSecret)
  console.log(code);

  // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.
  // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github
  axios
  .post(`https://kauth.kakao.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}&redirect_uri=${redirectURI}&grant_type=authorization_code`)
  .then(response => {
    let accessToken = response.data
    .split('&')
    .map((param: any) => {
      console.log(typeof param)
      param.split('=')
    })
    .filter((arr: any) => arr[0] === 'access_token')
    .flat()[1]
    console.log(accessToken)
    res.status(StatusCodes.OK).json({ accessToken: accessToken });
  }).catch(e => {
    res.status(StatusCodes.NOT_FOUND)
  })
}
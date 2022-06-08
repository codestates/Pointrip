import { Request, Response } from 'express';
import 'dotenv/config';

const clientID = process.env.KAKAO_CLIENT_ID;
const redirectURI = process.env.KAKAO_REDIRECT_URI;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getRepo } from '../../app';
import User from '../../entity/user';

export default async (req: Request, res: Response) => {
  // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
  console.log(typeof req)
  console.log(typeof res)
  let code = req.body.authorizationCode
  console.log(clientID)
  console.log(clientSecret)
  console.log(code);
  let accessToken;
  // 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.
  axios
  .post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientID}&redirect_uri=${redirectURI}&code=${code}&client_secret=${clientSecret}`)
  .then((response: any) => {
    accessToken = response.access_token;
    console.log(`액세스 토큰: ${accessToken}`);
    res.status(StatusCodes.OK)
    .json({ accessToken: accessToken });
  }).catch(e => {
    res.status(StatusCodes.NOT_FOUND)
    .send('액세스 토큰 수령에 실패하였습니다.');
  });
  const kakaoInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = kakaoInfo.data;
    let userInfo = await getRepo(User).findOneBy({
      email: result.kakao_account.email,
      /* oauthLogin: 'kakao', */
    });
    if (!userInfo) {
      const sameEmail = await getRepo(User).findOneBy({
        email: result.kakao_account.email,
      });
      if (sameEmail) {
        res.send('이미 사용 중인 이메일입니다.');
      }
      userInfo = await getRepo(User).save({
        nickName: result.properties.nickname,
        email: result.kakao_account.email,
        /* oauthLogin: 'kakao',
        saltedPassword: null,
        oauthCI: result.id,
        profileImage: null, */
      });
    }
    return userInfo;
}
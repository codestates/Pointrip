import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

const clientID = process.env.KAKAO_CLIENT_ID;
const redirectURI = process.env.KAKAO_REDIRECT_URI;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getRepo } from '../../app';
import User from '../../entity/user';
import token from '../token-functions';

export default {
  async requestAuthCode (req: Request, res: Response) {
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`;
    res.redirect(kakaoUrl);
  },
  async requestToken (req: Request, res: Response, next: NextFunction) {
    // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
    console.log(typeof req)
    console.log(typeof res)
    let code = req.query.code;
    console.log(clientID)
    console.log(clientSecret)
    console.log(code);
    // 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.
    let response = await axios
    .post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${clientID}&redirect_uri=${redirectURI}&code=${code}&client_secret=${clientSecret}`);
    let accessToken = response.data.access_token;
    if (accessToken) {
      console.log(`액세스 토큰: ${accessToken}`);
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
        userInfo = await getRepo(User).save({
          nickName: result.properties.nickname,
          email: result.kakao_account.email,
          /* oauthLogin: 'kakao',
          saltedPassword: null,
          oauthCI: result.id,
          profileImage: null, */
        });
      }
      req.session.regenerate(function (err) {
        if (err) next (err);

        // store user information in session, typically a user id
        req.session.user = result;

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next (err);
          token.sendAccessToken(res, accessToken);
        });
      });
    } else {
      res.status(StatusCodes.NOT_FOUND)
      .send('액세스 토큰 수령에 실패하였습니다.');
      console.log('액세스 토큰 수령에 실패하였습니다.');
    };
  }
}
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jsonWebtoken from 'jsonwebtoken';
const clientID = process.env.KAKAO_CLIENT_ID;
const redirectURI = process.env.KAKAO_REDIRECT_URI;
const clientSecret = process.env.KAKAO_CLIENT_SECRET;
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getRepo } from '../../app';
import User from '../../entity/user';
import token from '../token-functions';
import user from '../user';
import Post from '../../entity/post';
import Saved from '../../entity/saved';
import { count } from 'console';
import jwtToken from '../token-functions/index'
import { JsonWebTokenError } from 'jsonwebtoken';


  const requestAuthCode  = async (req: Request, res: Response) =>{
    console.log("reqertAuthToken 도입")
    const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code`;
    return res.redirect(kakaoUrl);
  }

    const requestToken = async (req: Request, res: Response) => {
    // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
    try{
      console.log("reqertToken 도입")
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
      console.log("result", result)
      let userInfo: any = await getRepo(User).findOneBy({
        email: result.kakao_account.email,
        /* oauthLogin: 'kakao', */
      });



      if (!userInfo) {
        userInfo = await getRepo(User).save({
          username: result.properties.nickname,
          email: result.kakao_account.email,
          password: 'kakao',
          passwordHash: 'kakao',
          profileImg: result.kakao_account.profile.profile_image_url
          /* oauthLogin: 'kakao',
          saltedPassword: null,
          oauthCI: result.id,
          profileImage: null, */
        });
      }
      console.log(userInfo.id)
      const userPost = await getRepo(Post).createQueryBuilder().select('COUNT(*) AS A').where({ user: userInfo.id }).execute()
      const userStorage = await getRepo(Saved).createQueryBuilder().select('COUNT(*) AS A').where({ user: userInfo.id }).execute()
      console.log(userPost[0].A)
      console.log(userStorage[0].A)

      console.log(userInfo.username)
      const payload = {
        userInfo: {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
          introduction: userInfo.introduction,
          profileImg: userInfo.profileImg
        },
        myPost: Number(userPost[0].A),
        myStorage: Number(userStorage[0].A)
      };

      console.log(payload)
      const userString : any = JSON.stringify(payload);
      const accessToken2 = jsonWebtoken.sign( payload, process.env.ACCESS_SECRET!, { expiresIn: "30d" });

      res.cookie("accessToken", accessToken2, {
        httpOnly: true,
        sameSite: "none",
      });

      console.log('accessToken', accessToken2);
      const realQuery = encodeURIComponent(accessToken2);

      // redirect를 이용해 쿼리로 accessToken을 전달 (ORIGIN : 클라이언트 url)
      res.redirect(`https://localhost:3000/login?access_token=${realQuery}`);

    } else {
       return res.status(StatusCodes.NOT_FOUND)
        .send('액세스 토큰 수령에 실패하였습니다.');
      console.log('액세스 토큰 수령에 실패하였습니다.');
    };
    
  }catch (err) {
    console.log("err",err)
    console.log(res.status);
  return res.status(500).send('internal server error');
  }

}
export default { requestAuthCode, requestToken };
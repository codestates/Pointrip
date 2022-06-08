import { Request, Response } from 'express';
import 'dotenv/config';

const clientID = process.env.NAVER_CLIENT_ID;
const redirectURI = process.env.NAVER_REDIRECT_URI;
const clientSecret = process.env.NAVER_CLIENT_SECRET;
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getRepo } from '../../app';
import User from '../../entity/user';

export default { 
  issue: async (req: Request, res: Response) => {
    // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
    console.log(typeof req);
    console.log(typeof res);
    let code = req.body.authorizationCode;
    let state = req.body.state;
    let accessToken;
    console.log(clientID);
    console.log(clientSecret);
    console.log(code);

    // 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다.
    axios
    .post(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${code}&state=${state}`)
    .then(response => {
      accessToken = response.data.access_token;
      console.log(`액세스 토큰: ${accessToken}`);
      res.status(StatusCodes.OK)
      .json({ accessToken: accessToken });
    }).catch(e => {
      res.status(StatusCodes.NOT_FOUND)
      .send('액세스 토큰 수령에 실패하였습니다.');
    });
    const naverInfo = await axios
    .get('https://openapi.naver.com/v1/nid/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      /* .catch((err) => {
        console.log('잘못된 접근입니다');
        res.send('잘못된 접근입니다');
      }); */

    const result = naverInfo.data.response;
    // 여기까지가 데이터 가져오는 코드
    let userInfo = await getRepo(User).findOneBy({
      email: result.email,
      oauthLogin: 'naver',
    });
    if (!userInfo) {
      const sameEmail = await getRepo(User).findOneBy({
        email: result.email,
      });
      if (sameEmail) {
        res.send('이미 사용중인 이메일입니다');
      }
      userInfo = await getRepo(User).save({
        nickName: result.email,
        email: result.email,
        /* oauthLogin: 'naver',
        saltedPassword: null,
        oauthCI: result.id,
        profileImage: null, */
      });
    }
    return userInfo;
  },
  /* renew: (req: Request, res: Response) => {
    // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
    console.log(typeof req)
    console.log(typeof res)
    let code = req.body.authorizationCode
    console.log(clientID)
    console.log(clientSecret)
    console.log(code);

    // 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다.
    axios
    .post(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientID}&client_secret=${clientSecret}&code=${code}&state=`)
    .then(response => {
      let accessToken = response.data
      .split('&')
      .map((param: any) => {
        console.log(`파라미터 타입: ${typeof param}`)
        param.split('=')
      })
      .filter((arr: any) => arr[0] === 'access_token')
      .flat()[1]
      console.log(`액세스 토큰: ${accessToken}`);
      res.status(StatusCodes.OK)
      .json({ accessToken: accessToken });
    }).catch(e => {
      res.status(StatusCodes.NOT_FOUND)
      .send(StatusCodes.NOT_FOUND);
    })
  }, */
  delete: (req: Request, res: Response) => {
    // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
    console.log(typeof req)
    console.log(typeof res)
    console.log(clientID)
    console.log(clientSecret)
    let accessToken;
    // 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다.
    axios
    .post(`https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${clientID}&client_secret=${clientSecret}&access_token=${accessToken}&service_provider=NAVER`)
    .then(response => {
      accessToken = response.data.access_token;
      console.log(`액세스 토큰: ${accessToken}`);
      res.status(StatusCodes.OK)
      .json({ accessToken: accessToken });
    }).catch(e => {
      res.status(StatusCodes.NOT_FOUND)
      .send('액세스 토큰 삭제에 실패하였습니다.');
    })
  }
}
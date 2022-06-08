import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { getRepo } from '../../app';
import Post from '../../entity/post';
import User from '../../entity/user';
import token from '../token-functions';

// user's nth post
export default async (req: Request, res: Response) => {
  let username = req.params.username;
  /* console.log(username); */
  console.log('게시물 순서 파악 중...');
  console.log(`리퀘스트 헤더: ${req.headers}`);
  const accessTokenData: any = await token.isAuthorized(req);
  console.log(`액세스 토큰 데이터: ${accessTokenData}`);
  // 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공.
  if (!accessTokenData) {
    console.log('권한이 없습니다.');
    return res.status(StatusCodes.UNAUTHORIZED)
    .send('권한이 없습니다.');
  }
  return getRepo(Post)
  .find({ where: { userId: accessTokenData.id }})
  .then((data: any[]) => {
    res.send({ message: data.length + 1 });
  })
  .catch((err: any) => res.send({ error: err, message: 'fail' }));
}
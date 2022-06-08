import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { getRepo } from '../../app';
import User from '../../entity/user';
import token from '../token-functions';

// edit profile image
export default async (req: Request, res: Response) => {
  const accessTokenData: any = token.isAuthorized(req);
  // 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공.
  if (!accessTokenData) {
    console.log('권한이 없습니다.');
    return res.status(StatusCodes.UNAUTHORIZED)
    .send('권한이 없습니다.');
  }
  const userRepo = getRepo(User);
  const userToUpdate: any = await userRepo
  .find({ where: { email: accessTokenData?.email }});
  userToUpdate.image = req.body.image;
  const user = await getRepo(User).save(userToUpdate);
  console.log(`사용자: ${user}`);
  return res.send('이미지 변경이 완료되었습니다.');
}
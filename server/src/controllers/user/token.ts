import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getRepo } from "../../app";
import User from "../../entity/user";
import token from '../token-functions';

// request login
export default async (req: Request, res: Response) => {
  const accessTokenData: any = token.isAuthorized(req);
    // 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공.
    if (!accessTokenData) {
      res.status(StatusCodes.UNAUTHORIZED)
      .send('권한이 없습니다.');
    }
    const user = await getRepo(User)
    .find({ where: { email: accessTokenData?.email }});
    if (user.length) res.send(ReasonPhrases.OK);
    res.status(404)
    .send('존재하지 않는 사용자입니다.');
};
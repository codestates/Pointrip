import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getRepo } from "../../app";
import User from "../../entity/user";
import token from '../token-functions';

export default async (req: Request, res: Response) => {
  // 로그인 정보를 통해 사용자 인증 후 토큰 전달
  console.log('로그인 중...');
  const { email, password } = req.body;
  console.log(req.body);
  const user: any = await getRepo(User).find({ where: { email, password } });
  console.log(user[0]);
  if (!user[0]) {
    console.log('이메일 또는 비밀번호가 올바르지 않습니다.');
    res.status(StatusCodes.NOT_FOUND)
    .send('이메일 또는 비밀번호가 올바르지 않습니다.');
  } else {
    let obj: any = Object.assign({}, user[0]);
    /* console.log(obj); */
    if (!bcrypt.compareSync(password, obj.passwordHash))
    return res.status(400).send('인증에 실패하였습니다.');
    delete obj.password;
    console.log(obj);
    const accessToken = token.generateAccessToken(obj);
    token.sendAccessToken(res, accessToken);
  }
};
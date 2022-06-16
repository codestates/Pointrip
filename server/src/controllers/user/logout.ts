import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default (req: Request, res: Response) => {
  console.log('로그아웃 중...');
  res.status(StatusCodes.RESET_CONTENT).cookie('jwt', '').json({ logoutSuccess: true });
  return console.log('로그아웃되었습니다.');
}
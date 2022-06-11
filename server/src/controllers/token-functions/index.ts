import 'dotenv/config';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

export default {
  generateAccessToken: (data: Request) => {
    return sign(data, process.env.ACCESS_SECRET!, { expiresIn: "30d" });
  },
  /* generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET!, { expiresIn: "30d" });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  }, */
  sendAccessToken: (res: Response, accessToken: string) => {
    res
    .cookie("jwt", accessToken, {
      httpOnly: true,
    }).json({ data: { accessToken }, message: "ok" });
  },
  /* resendAccessToken: (res: Response, accessToken: string, data: any) => {
    res.json({ data: { accessToken, userInfo: data }, message: "ok" });
  }, */
  isAuthorized: (req: Request) => {
    const cookie: any = req.headers.authorization;
    console.log(cookie)
    if (!cookie) {
      console.log('쿠키가 발견되지 않았습니다.');
      return null;
    }
    const token = cookie.split("=")[1];
    try {
      return verify(token, process.env.ACCESS_SECRET!);
    } catch (err) {
      // return null if invalid token
      console.log('유효하지 않은 토큰입니다.');
      return null;
    }
  },
  /* checkRefeshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET!);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  }, */
};
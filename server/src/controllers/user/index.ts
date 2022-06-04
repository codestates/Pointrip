import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { getRepo } from "../../app";
import User from "../../entity/user";
import token from '../token-functions';

export default {
  greetings: (req: Request, res: Response) => {
    res.send("Hello, world!");
  },
  // post: signup --------------------------------------------------------------
  // get ${email}: check duplicate email
  // get ${username}: check duplicate username
  /* signup: (req: Request, res: Response) => {
    // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
    let { username, email, password, mobile } = req.body;
    // if(Object.values(userinfo).every(value => value !== "") ) { ....}
    if (
      !username ||
      !email ||
      !password ||
      !mobile
    ) res.status(422).send('insufficient parameters supplied');
    User.findOrCreate({
      where: { email }, 
      defaults: {
        username,
        password,
        mobile
      }
    })
    // findOrCreate => [user값, boolean] 배열형태 
    .then(([user, created]: any) => {
      // false 라면 409상태와 'email exists'
      // console.log(user)
      // false, email 존재한다면
      if (!created) {
        throw new Error('409');
      }
      // true, email 존재하지 않으면
      let accessToken = token.generateAccessToken(user.dataValues);
      res
      .status(201)
      .cookie('jwt', accessToken, { httpOnly: true })
      .json({ message: 'ok' });
    })
    .catch((err: any) => {
      if (err.message === '409') {
        res.status(409).send('email exists');
      }
    })
  }, */
  // get: request user info ------------------------------------------------------
  getUserInfo: (req: Request, res: Response) => {
    const accessTokenData: any = token.isAuthorized(req);
    // TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
    if (accessTokenData === null) {
      res.status(StatusCodes.UNAUTHORIZED).send({ data: null, message: ReasonPhrases.UNAUTHORIZED });
    }
    return getRepo(User)
    .findOne({ where: {
      email: accessTokenData?.email,
      username: accessTokenData?.username,
      phone: accessTokenData?.phone
    }}).then((data: any) => {
      res.json({ data: { userInfo: data.dataValues } });
    }).catch((err: any) => {
      console.log(err);
    });
  },
  // patch: edit user info
  editUserInfo (req: Request, res: Response) {
    res.send('editUserInfo');
  },
  // delete ${email}: dropout
  dropout (req: Request, res: Response) {
    res.send('dropout');
  },
  async all(request: Request, response: Response, next: NextFunction) {
      return getRepo(User).find()
  },
  async one(request: Request, response: Response, next: NextFunction) {
      return getRepo(User).findOne({where: {id: parseInt(request.params.id)}})
  },
  async save(request: Request, response: Response, next: NextFunction) {
    console.log(request.body);
      return getRepo(User).save(request.body);
  },
  async remove(request: Request, response: Response, next: NextFunction) {
      let userToRemove = await getRepo(User).findOneBy({ id: parseInt(request.params.id) })
      await getRepo(User).remove(userToRemove as any)
  }
}
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { getRepo } from "../../app";
import User from "../../entity/user";
import token from '../token-functions';

export default {
  greetings: (req: Request, res: Response) => {
    res.send("Hello, world!");
  },
  // get ${email}: check duplicate email ---------------------------------------
  checkEmail: (req: Request, res: Response) => {
    console.log('Checking duplicate email...');
    getRepo(User).find({
    where: {
        email: req.params.email
      }
    }).then(result => {
      /* console.log(result); */
      if (result.length > 0) {
        res.send(ReasonPhrases.CONFLICT);
        /* throw new Error(ReasonPhrases.CONFLICT); */
        console.log(ReasonPhrases.CONFLICT);
      } else {
        res.send('No duplicate email found.');
      }
    });
  },
  // get ${username}: check duplicate username ---------------------------------
  checkUsername: (req: Request, res: Response) => {
    console.log('Checking duplicate username...');
    getRepo(User).find({
    where: {
        username: req.params.username
      }
    }).then(result => {
      /* console.log(result); */
      if (result.length > 0) {
        res.send(ReasonPhrases.CONFLICT);
        /* throw new Error(ReasonPhrases.CONFLICT); */
        console.log(ReasonPhrases.CONFLICT);
      } else {
        res.send('No duplicate username found.');
      }
    });
  },
  // post: signup --------------------------------------------------------------
  async signup (req: Request, res: Response) {
    // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
    let { username, email, password } = req.body;
    /* console.log({ username, email, password }); */
    if (
      !username ||
      !email ||
      !password
    ) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send(ReasonPhrases.UNPROCESSABLE_ENTITY);
    } else {
      const user = await getRepo(User).create(req.body);
      /* await console.log(user); */
      (user as any).passwordHash = bcrypt.hashSync(req.body.password, 10);
      try {
        const results = await getRepo(User).save(user);
        console.log(results);
        let obj: object = Object.assign({}, results);
        let accessToken = token.generateAccessToken(obj as any);
        /* console.log(accessToken); */
        res
        .status(StatusCodes.CREATED)
        .cookie('jwt', accessToken, { httpOnly: true })
        /* .json({ message: ReasonPhrases.CREATED }); */
        .send(ReasonPhrases.CREATED);
      } catch {
        return res.send('Duplicate entry.');
      }
    }
  },
  // get: request user info ----------------------------------------------------
  getUserInfo: (req: Request, res: Response) => {
    const accessTokenData: any = token.isAuthorized(req);
    // 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공.
    if (!accessTokenData) {
      res.status(StatusCodes.UNAUTHORIZED)
      .send({ data: null, message: ReasonPhrases.UNAUTHORIZED });
    }
    return getRepo(User)
    .find({ where: { email: accessTokenData?.email }})
    .then((data: any) => {
      console.log(data);
      res.json({ data: { userInfo: data } });
    })
    .catch((err: any) => console.log(err));
  },
  // patch: edit user info -----------------------------------------------------
  async editUserInfo (req: Request, res: Response) {
    const accessTokenData: any = token.isAuthorized(req);
    // 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공.
    if (!accessTokenData) {
      res.status(StatusCodes.UNAUTHORIZED)
      .send({ data: null, message: ReasonPhrases.UNAUTHORIZED });
    }
    const userToUpdate: any = await getRepo(User)
    .find({ where: { email: accessTokenData?.email }});
    userToUpdate.username = req.body.username;
    userToUpdate.password = req.body.password;
    userToUpdate.phone = req.body.phone;
    userToUpdate.bio = req.body.bio;
    await getRepo(User).save(userToUpdate);
  },
  // delete ${email}: dropout --------------------------------------------------
  async dropout (req: Request, res: Response) {
    console.log('Commencing dropout...');
    /* console.log(req); */
    let userToRemove = await getRepo(User).find({ where: { email: req.params.email } });
    /* console.log(userToRemove); */
    if (userToRemove.length > 0) {
      await getRepo(User).remove(userToRemove as object);
      console.log('Dropout complete.');
      res.send('Dropout complete.');
    } else {
      console.log('No such user found.');
      res.send('No such user found.');
    }
  },
  /* async all(request: Request, response: Response, next: NextFunction) {
      return getRepo(User).find()
  },
  async one(request: Request, response: Response, next: NextFunction) {
      return getRepo(User).find({where: {id: parseInt(request.params.id)}})
  } */
}
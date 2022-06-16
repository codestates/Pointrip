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
    console.log('이메일 중복 여부 확인 중...');
    getRepo(User)
      .find({ where: { email: req.params.email } })
      .then(result => {
        /* console.log(result); */
        if (result.length > 0) {
          res.status(StatusCodes.CONFLICT)
            .send('이미 등록된 이메일입니다.');
          /* throw new Error(ReasonPhrases.CONFLICT); */
          return console.log('이미 등록된 이메일입니다.');
        } else {
          res.send('사용할 수 있는 이메일입니다.');
        }
      });
  },
  // get ${username}: check duplicate username ---------------------------------
  checkUsername: (req: Request, res: Response) => {
    console.log('이름 중복 여부 확인 중...');
    getRepo(User)
      .find({ where: { username: req.params.username } })
      .then(result => {
        /* console.log(result); */
        if (result.length > 0) {
          res.status(StatusCodes.CONFLICT)
            .send('이미 등록된 이름입니다.');
          return console.log('이미 등록된 이름입니다.');
        } else {
          res.send('사용할 수 있는 이름입니다.');
        }
      });
  },
  // post: signup --------------------------------------------------------------
  async signup(req: Request, res: Response) {
    // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
    let { username, email, password } = req.body;
    console.log({ username, email, password });
    if (
      !username ||
      !email ||
      !password
    ) {
      res.status(422)
        .send('이름, 이메일, 비밀번호를 모두 입력하여 주십시오.');
      return console.log('이름, 이메일, 비밀번호를 모두 입력하여 주십시오.');
    } else {
      console.log('이메일 중복 여부 확인 중...');
      let user = await getRepo(User).find({ where: { email } });
      console.log(`검색 결과: ${user}`);
      if (user.length > 0) {
        res.status(409)
          .send('이미 등록된 이메일입니다.');
        /* throw new Error(ReasonPhrases.CONFLICT); */
        return console.log('이미 등록된 이메일입니다.');
      } else {
        console.log('사용할 수 있는 이메일입니다.');
        console.log('이름 중복 여부 확인 중...');
        user = await getRepo(User).find({ where: { username } });
        console.log(`검색 결과: ${user}`);
        if (user.length > 0) {
          res.status(409)
            .send('이미 등록된 이름입니다.');
          return console.log('이미 등록된 이름입니다.');
        } else {
          console.log('사용할 수 있는 이름입니다.');
          let user = await getRepo(User).create(req.body);
          if (!user) {
            res.status(500)
              .send('계정 생성에 실패하였습니다.');
            return console.log('계정 생성에 실패하였습니다.');
          } else {
            console.log(`계정 생성 완료: ${user}`);
            (user as any).passwordHash = bcrypt.hashSync(password, 10);
            const results = await getRepo(User).save(user);
            if (!results) {
              res.status(500)
                .send('계정 저장에 실패하였습니다.');
              return console.log('계정 저장에 실패하였습니다.');
            } else {
              console.log(`계정 저장 완료: ${results}`);
              let obj: object = Object.assign({}, results);
              if (!obj) {
                res.status(500)
                  .send('클래스를 객체로 전환하는 데 실패하였습니다.');
                return console.log('클래스를 객체로 전환하는 데 실패하였습니다.');
              } else {
                console.log(`클래스의, 객체로의 전환 완료: ${obj}`);
                let accessToken = token.generateAccessToken(obj as any);
                if (!accessToken) {
                  res.status(500)
                    .send('액세스 토큰 생성에 실패하였습니다.');
                  return console.log('액세스 토큰 생성에 실패하였습니다.');
                } else {
                  console.log(`액세스 토큰 생성 완료: ${accessToken}`);
                  res.status(201)
                    .cookie('jwt', accessToken, { httpOnly: true })
                    /* .json({ message: ReasonPhrases.CREATED }); */
                    .send('회원 가입이 완료되었습니다.');
                }
              }
            }
          }
        }
      }
    }
  },
  // get: request user info ----------------------------------------------------
  getUserInfo: (req: Request, res: Response) => {
    const accessTokenData: any = token.isAuthorized(req);
    // 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공.
    if (!accessTokenData) {
      res.status(StatusCodes.UNAUTHORIZED)
        .send('권한이 없습니다.');
    }
    return getRepo(User)
      .find({ where: { email: accessTokenData?.email } })
      .then((data: any) => {
        console.log(data[0]);
        res.json({ data: { userInfo: data[0] } });
      })
      .catch((err: any) => console.log(err));
  },
  // patch: edit user info -----------------------------------------------------
  async editUserInfo(req: Request, res: Response) {
    console.log("유저정보수정 도입")
    try {
      const accessTokenData: any = token.isAuthorized(req);
      const { introduction, username, password } = req.body
      const profileImg: any = req.files;
      let imagesArray: any;

      if (!accessTokenData) {
        res.status(StatusCodes.UNAUTHORIZED)
          .send('권한이 없습니다.');
      }
      else if (profileImg) {
        imagesArray = profileImg.map((oneFile: any) => {
          return String(oneFile.location);
        });

      }

      console.log(introduction, username, password, imagesArray)


      await getRepo(User).createQueryBuilder().update().set(
        {
          introduction: introduction, password: password, passwordHash: bcrypt.hashSync(password, 10), username: username, profileImg: imagesArray[0]
        }
      ).where({ id: accessTokenData.id }).execute().then(async (data1: any) => {
        return res.status(200).send({
          message: "회원정보수정완료",
        })
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send('internal server error');
    }


  },
  // delete ${email}: dropout --------------------------------------------------
  async dropout(req: Request, res: Response) {
    console.log('회원 탈퇴 중...');
    /* console.log(req); */
    let userToRemove = await getRepo(User).find({ where: { email: req.params.email } });
    /* console.log(userToRemove); */
    if (userToRemove.length > 0) {
      await getRepo(User).remove(userToRemove as object);
      console.log('회원 탈퇴가 완료되었습니다.');
      res.send('회원 탈퇴가 완료되었습니다.');
    } else {
      console.log('존재하지 않는 사용자입니다.');
      res.status(400)
        .send('존재하지 않는 사용자입니다.');
    }
  },
  /* async all(request: Request, response: Response, next: NextFunction) {
      return getRepo(User).find()
  },
  async one(request: Request, response: Response, next: NextFunction) {
      return getRepo(User).find({where: {id: parseInt(request.params.id)}})
  } */
}
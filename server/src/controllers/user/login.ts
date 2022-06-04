import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getRepo } from "../../app";
import User from "../../entity/user";
import token from '../token-functions';

export default (req: any, res: any) => {
  // TODO: 로그인 정보를 통해 사용자 인증 후 토큰 전달
  const { email, password } = req.body;
  getRepo(User)
  .findOne({ where: { email, password } })
  .then((data: any) => {
    if (!data) return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    delete data.dataValues.password;
    const accessToken = token.generateAccessToken(data.dataValues);
    token.sendAccessToken(res, accessToken);
  })
  .catch((err: any) => {
    console.log(err);
  });
};

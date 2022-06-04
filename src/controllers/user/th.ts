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
  console.log('Retrieving post order...');
  console.log(req.headers);
  const accessTokenData: any = await token.isAuthorized(req);
  console.log(accessTokenData);
  // 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공.
  if (!accessTokenData) {
    console.log(ReasonPhrases.UNAUTHORIZED);
    return res.status(StatusCodes.UNAUTHORIZED)
    .send(ReasonPhrases.UNAUTHORIZED);
  }
  return getRepo(Post)
  .find({ where: { userId: accessTokenData.id }})
  .then((data: any[]) => {
    if (data.length > 0) {
    /* console.log(data); */
    res.send({ message: data.length + 1 });
    } else res.send('No such post found.');
  })
  .catch((err: any) => res.send({ error: err, message: 'fail' }));
}
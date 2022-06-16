import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default (req: Request, res: Response, next: NextFunction) => {
  console.log('로그아웃 중...');
  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = {};
  req.session.save(function (err) {
    if (err) next(err);

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect('/');
    });
  });
  res.status(StatusCodes.RESET_CONTENT).cookie('jwt', '').json({ logoutSuccess: true });
  return console.log('로그아웃되었습니다.');
}
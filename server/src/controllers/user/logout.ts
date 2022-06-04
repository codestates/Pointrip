import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default (req: Request, res: Response) => {
  console.log('Commencing logout...');
  res.status(StatusCodes.RESET_CONTENT).cookie('jwt', '').json({ logoutSuccess: true });
  return console.log('Logged out.');
}
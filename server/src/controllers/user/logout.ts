import { StatusCodes } from "http-status-codes";

export default (req: any, res: any) => {
  // TODO: 로그아웃 로직을 작성합니다.
  return res.status(StatusCodes.RESET_CONTENT).cookie('jwt', '').json({ logoutSuccess: true });
}
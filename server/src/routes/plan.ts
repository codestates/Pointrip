import express, { NextFunction, Request, Response } from "express";
import addPlan from "../controllers/plan/addpost";
import getPlan from "../controllers/plan/getplan"


const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', new Date().toLocaleString());
  next();
});
/* router.get('/', (req: Request, res: Response) => {
  res.send('Birds home page')
}) */
router.get('/', getPlan);
router.post('/', addPlan)
router.patch('/')
router.get('/${nickname}')
router.get('/${nickname}/${post_id}') //하나의 게시물에 포인트1보여주기
router.get('/${nickname}/${post_id}/${point_id}') //~2
router.get('/plan/search?search=${search}')
router.delete('/')





export default router;
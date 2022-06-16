import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import UserRouter from "../routes/user";
import PlanRouter from "../routes/plan";
import BookRouter from "../routes/bookmark";

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time:', new Date().toLocaleString())
  next()



  router.use('/users', UserRouter);
  router.use('/plan', PlanRouter);
  router.use('/bookmark', BookRouter)




});
export default router;
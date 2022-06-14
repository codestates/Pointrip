import express from "express";
import addPlan from "../controllers/plan/addpost";
import deletePlan from "../controllers/plan/deletepost";
import getPlan from "../controllers/plan/getplan"
import myPage from "../controllers/plan/mypage"
import myPost from "../controllers/plan/readPost";
import updPlan from "../controllers/plan/updatepost";
import { upload } from "../middleware/multer";


const router = express.Router();


router.get('/', getPlan);
router.post(
    "/",
    upload.array("image", 5),
    addPlan
);
router.patch('/postId=:postId', updPlan)
router.get('/mypost/', myPage) //토큰값보내주기
router.get('/postId=:postId', myPost) //하나의 게시물에 포인트1보여주기
router.get('/search?search=${search}')
router.delete('/postId=:postId', deletePlan)





export default router;
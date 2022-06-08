import express from 'express';
const router = express.Router();

import kakao from '../controllers/oauth/kakao';
// import kakao from '../controllers/oauth/kakao';

router.post('/kakao', kakao);
// router.post('/naver', naver);

export default router;
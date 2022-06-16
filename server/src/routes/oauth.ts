import express from 'express';
const router = express.Router();

import kakao from '../controllers/oauth/kakao';

router.get('/kakao', kakao.requestAuthCode);
router.get('/', kakao.requestToken);

export default router;
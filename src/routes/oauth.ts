import express from 'express';
const router = express.Router();

import kakao from '../controllers/oauth/kakao';

router.post('/oauth/kakao', kakao);

export default router;
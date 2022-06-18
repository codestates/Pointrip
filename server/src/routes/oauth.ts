import express from 'express';
const router = express.Router();

import Kakao from '../controllers/oauth/kakao';

router.get('/kakao',Kakao.requestAuthCode )
router.get('/',Kakao.requestToken);

export default router;
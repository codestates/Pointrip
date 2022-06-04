import express, { Request, Response } from 'express';
const router = express.Router();

import controller from '../controllers';

router.put('/image', );
router.get('/th/:username', );
/* router.get('/', controller.user.greetings); */
/* router.post('/', controller.user.signup); */
router.get('/', controller.user.getUserInfo);
router.patch('/', controller.user.editUserInfo);
router.delete('/:email', controller.user.dropout);
/* router.get('/:email', );
router.get('/:username', ); */
router.post('/login', controller.login);
router.get('/token', );
router.get('/logout', controller.logout);
router.get('/fpass', );
router.get('/femail', );

export default router;
import express, { NextFunction, Request, Response } from 'express';
import controller from '../controllers';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', new Date().toLocaleString());
  next();
});
/* router.get('/', (req: Request, res: Response) => {
  res.send('Birds home page')
}) */
router.put('/image', controller.image);
router.get('/th/:username', controller.th);
router.post('/', controller.user.signup);
router.get('/', controller.user.getUserInfo);
router.patch('/', controller.user.editUserInfo);
router.delete('/:email', controller.user.dropout);
router.get('/mail/:email', controller.user.checkEmail);
router.get('/nick/:username', controller.user.checkUsername);
router.post('/login', controller.login);
router.get('/token', controller.token);
router.get('/logout', controller.logout);
router.get('/fpass', );
router.get('/femail', );

export default router;
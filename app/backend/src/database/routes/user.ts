import { Router } from 'express';
import controller from '../controllers/user';
import verifyBody from '../middlewares/userMiddleware';

const userRouter = Router();

userRouter.post('/', verifyBody, controller.getUser);
userRouter.get('/validate', controller.verifyUser);

export default userRouter;

import { Router } from 'express';
import getUser from '../controllers/user';
import verifyBody from '../middlewares/userMiddleware';

const userRouter = Router();

userRouter.post('/', verifyBody, getUser);

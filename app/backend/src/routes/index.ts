import { Router } from 'express';
import clubRouter from './club';
import matchRouter from './match';
import loginRouter from './login';

const router = Router();

router.use(clubRouter);
router.use(matchRouter);
router.use(loginRouter);

export default router;

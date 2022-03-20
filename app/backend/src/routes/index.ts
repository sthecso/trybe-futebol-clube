import { Router } from 'express';
import clubRouter from './club';
import matchRouter from './match';
import loginRouter from './login';

const router = Router();

router.use('/clubs', clubRouter);
router.use('/matchs', matchRouter);
router.use('/login', loginRouter);

export default router;

import { Router } from 'express';

import 'express-async-errors';

import login from './login';
import clubs from './club';
import matches from './match';
import leaderboard from './leaderboard';

import {
  domainError,
  serverError,
} from '../middlewares/error';

const router = Router();

// routes
router.use('/login', login);
router.use('/clubs', clubs);
router.use('/matchs', matches);
router.use('/leaderboard', leaderboard);

// error middlewares
router.use(domainError);
router.use(serverError);

export default router;

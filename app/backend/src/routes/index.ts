import { Router } from 'express';

import 'express-async-errors';

import login from './login';

import {
  domainError,
  joiError,
  serverError,
} from '../middlewares/error';

const router = Router();

// routes
router.use('/login', login);

// error middlewares
router.use(joiError);
router.use(domainError);
router.use(serverError);

export default router;

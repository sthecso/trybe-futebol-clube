import { Router } from 'express';
import { login, validate } from '../controllers/login';
import { validateToken } from '../auth';

const loginRouter = Router();

loginRouter.post('/', login);

loginRouter.get('/validate', validateToken, validate);

export default loginRouter;

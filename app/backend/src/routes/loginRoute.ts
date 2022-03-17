import { Request, Response, Router } from 'express';
import { createError } from '../utils';
import loginControllerFactory from '../factories';

const loginRoute = Router();
const loginController = loginControllerFactory();

loginRoute.post('/', async (req: Request, res: Response): Promise<Response> => {
  const result = await loginController.handle(req.body);

  return res.status(200).json(result);
});

loginRoute.get('/validate', async (req: Request, res: Response): Promise<Response> => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw createError('unauthorized', 'Token not found');
  }

  const result = await loginController.validate(authorization);
  console.log(result);

  return res.status(200).json(result);
});

export default loginRoute;

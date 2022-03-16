import { Request, Response, Router } from 'express';
import loginControllerFactory from '../factories';

const loginRoute = Router();
const loginController = loginControllerFactory();

loginRoute.post('/', async (req: Request, res: Response): Promise<Response> => {
  const result = await loginController.handle(req.body);
  return res.json(result);
});

export default loginRoute;

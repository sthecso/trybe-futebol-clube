import { Request, Response, Router } from 'express';
import auth from '../middlewares/auth';
import { loginControllerFactory } from '../factories';

const loginRoute = Router();
const loginController = loginControllerFactory();

loginRoute.post(
  '/',
  async (req: Request, res: Response): Promise<Response> => {
    const result = await loginController.handle(req.body);

    return res.status(200).json(result);
  },
);

loginRoute.get(
  '/validate',
  auth,
  async (req: Request, res: Response): Promise<Response> => {
    const { userRole } = req as unknown as { userRole: string };

    const result = loginController.validate(userRole);

    return res.status(200).json(result);
  },
);

export default loginRoute;

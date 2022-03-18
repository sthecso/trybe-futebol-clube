import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import loginUser from '../service/login';
import loginValidation from '../middlewares/validation/loginValidation';
import { sign, verify } from '../utils/jwt';

const routerLogin = express.Router();

interface IObjectWithRole {
  role: string;
}

routerLogin.post(
  '/',
  loginValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const loggedUser = await loginUser({ email, password }) as IObjectWithRole;
      const { role } = loggedUser;
      req.headers.authorization = sign({ role });
      const reqAuth = req.headers.authorization;
      return res.status(200).json({ ...loggedUser, token: reqAuth });
    } catch (error) {
      next(error);
    }
  },
);

routerLogin.get(
  '/validate',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqAuth = req.headers.authorization as string;
      const { role } = verify(reqAuth) as IObjectWithRole;
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  },
);

export default routerLogin;

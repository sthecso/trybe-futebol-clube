import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { loginSchema } from '../schemas';
import { LoginService } from '../services';

export default class LoginController {
  public static login() {
    return async (req: Request, res: Response) => {
      const { email, password } = req.body;

      loginSchema.parse({ email, password });

      const result = await LoginService.login({ email, password });

      res.status(StatusCodes.OK).json(result);
    };
  }

  public static validate() {
    return async (req: Request, res: Response) => {
      const { authorization } = req.headers;

      if (!authorization) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: 'Token not found' });
      }

      const result = await LoginService.validate(authorization);

      res.status(StatusCodes.OK).json({ role: result });
    };
  }
}

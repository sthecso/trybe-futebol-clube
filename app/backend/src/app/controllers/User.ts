import { Request, Response } from 'express';
import StatusCode from '../utils/statusCode';
import { IUserLogin } from '../interfaces/IUser';
import { userService } from '../services/User';

export default class UserController {
  static async login(req: Request, res: Response) {
    const loginInfo = req.body as IUserLogin;
    const loginRes = await userService.login(loginInfo);

    if (!loginRes) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(StatusCode.OK).json(loginRes);
  }

  static async loginValidate(req: Request, res: Response) {
    const { role } = req.body;

    return res.status(StatusCode.OK).json(role);
  }
}

export const userController = UserController;

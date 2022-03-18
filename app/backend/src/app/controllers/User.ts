import { Request, Response } from 'express';
import StatusCode from '../utils/statusCode';
import { IUserLogin } from '../interfaces/IUser';
import { userService } from '../services/User';

export default class UserController {
  async login(req: Request, res: Response) {
    const loginInfo = req.body as IUserLogin;
    const loginRes = await userService.login(loginInfo);
    res.status(StatusCode.OK).json(loginRes);
    return this;
  }
}

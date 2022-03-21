import { Request, Response } from 'express';
import StatusCode from '../utils/statusCode';
import { IUserReq } from '../interfaces/login';
import JwtMethods from '../utils/jwtMethods';
import LoginUserModel from '../models/userLogin';

class LoginUserController {
  private StatusCode = StatusCode;

  private jwtUtils = new JwtMethods();

  private loginModel = new LoginUserModel();

  constructor() {
    this.findUser = this.findUser.bind(this);
  }

  async findUser(req: Request, res: Response): Promise<Response> {
    const requestData = req.body as IUserReq;
    const user = await this.loginModel.findUser(requestData);
    if (user === null) {
      return res.status(this.StatusCode.Unauthorized)
        .json({ message: 'Incorrect email or password' });
    }

    const token = this.jwtUtils.generateToken(user);

    return res.status(this.StatusCode.Ok).json({ user: { ...user }, token });
  }
}

export default LoginUserController;

import { Request, Response } from 'express';
import StatusCode from '../utils/statusCode';
import { IUserReq } from '../interfaces/login';
import LoginUserService from '../services/userLogin';
/* import { GenerateStatusError } from '../utils'; */

class LoginUserController {
  private StatusCode = StatusCode;

  private loginService = new LoginUserService();

  constructor() {
    this.findUser = this.findUser.bind(this);
  }

  async findUser(req: Request, res: Response): Promise<Response> {
    const requestData = req.body as IUserReq;
    const user = await this.loginService.findUser(requestData);
    if (user === null) {
      return res.status(this.StatusCode.Unauthorized)
        .json({ message: 'Incorrect email or password' });
    }

    return res.status(this.StatusCode.Ok).json(user);
  }
}

export default LoginUserController;

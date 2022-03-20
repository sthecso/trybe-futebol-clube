import { Request, RequestHandler, Response } from 'express';
import ValidLogin from './middleware/validLogin';
import ServiceUser from '../services/user';
import helpjwt from '../utils/helpjwt';
import { IUserJwt } from '../interface/user';

class Login {
  private _validLogin:ValidLogin;

  private _serviceUser: ServiceUser = new ServiceUser();

  private _token:IUserJwt;

  public async post(req:Request, res:Response) {
    this._validLogin = new ValidLogin(req.body);
    const user = await this._serviceUser.getByEmail(req.body);
    return res.status(200).json(user);
  }

  public validUser:RequestHandler = (req, res) => {
    if (req.headers.authorization) {
      this._token = helpjwt.verify(req.headers.authorization);
      return res.status(200).json({ message: this._token.role });
    }
  };
}

export default Login;

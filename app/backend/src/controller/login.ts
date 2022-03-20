import { Request, RequestHandler, Response } from 'express';
import ValidLogin from './middleware/validLogin';
import ServiceUser from '../services/user';

class Login {
  private _validLogin:ValidLogin;

  private _serviceUser: ServiceUser = new ServiceUser();

  public async post(req:Request, res:Response) {
    this._validLogin = new ValidLogin(req.body);
    const user = await this._serviceUser.getByEmail(req.body);
    return res.status(200).json(user);
  }

  public validUser:RequestHandler = (req, res) => res.status(200).json({ message: req.user.role });
}

export default Login;

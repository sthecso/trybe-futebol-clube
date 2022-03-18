import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'sequelize/types';
import User from '../database/models/User';
import auth from '../utils/auth';

class LoginService {
  _result: Model | User[] | null | string | JwtPayload;

  constructor() {
    this.validate = this.validate.bind(this);
    this.login = this.login.bind(this);
  }

  public async validate(req: Request, res: Response) {
    let token = req.headers.authorization;
    if (!token) {
      token = 'no token';
    }
    this._result = await auth.verify(token);
    res.send(res);
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    this._result = await User.findOne({
      where: { email, password },
      attributes: ['id', 'username', 'role', 'email'],
    });
    if (this._result) {
      const token = await auth.sign({
        email,
      });
      return res.status(200).json({ user: this._result, token });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
}

export default new LoginService();

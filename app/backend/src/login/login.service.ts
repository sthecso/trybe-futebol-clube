import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'sequelize/types';
import User from '../database/models/User';
import auth from '../utils/auth';

class LoginService {
  _result: string | JwtPayload;

  _user: Model | User | null;

  constructor() {
    this.validate = this.validate.bind(this);
    this.login = this.login.bind(this);
  }

  public async validate(req: Request, res: Response) {
    let token = req.headers.authorization;
    if (!token) {
      token = 'no token';
    }
    try {
      this._result = await auth.verify(token);
      return res.status(200).send(
        'admin',
      );
    } catch (err) {
      return res.status(401).json({
        message: 'Token is not valid',
      });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (password !== 'secret_admin' && password !== 'secret_user') {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    this._user = await User.findOne({
      where: { email },
      attributes: ['id', 'username', 'role', 'email'],
    });
    if (this._user) {
      const token = await auth.sign({
        // email,
        data: this._user?.get('role'),
      });
      return res.status(200).json({ user: this._user, token });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
}

export default new LoginService();

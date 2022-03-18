import { Request, Response } from 'express';
import { Model } from 'sequelize/types';
import User from '../database/models/User';
import auth from '../utils/auth';

class LoginService {
  _result: Model | User[] | null;

  constructor() {
    this.index = this.index.bind(this);
    this.login = this.login.bind(this);
  }

  public async index(_req: Request, res: Response): Promise<Response> {
    this._result = await User.findAll({
      attributes: ['id', 'username', 'role', 'email'],
    });
    return res.json(this._result);
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      this._result = await User.findOne({
        where: { email, password },
        attributes: ['id', 'username', 'role', 'email'],
      });
      if (this._result) {
        const token = await auth.sign({
          email,
        });
        return res.json({ user: this._result, token });
      }
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
}

export default new LoginService();

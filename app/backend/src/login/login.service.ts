import { Request, Response } from 'express';
import { Model } from 'sequelize/types';
import User from '../database/models/User';
import auth from '../utils/auth';

class LoginService {
  _result: Model | User[];

  constructor() {
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
  }

  public async index(_req: Request, res: Response): Promise<Response> {
    this._result = await User.findAll({
      attributes: ['id', 'username', 'role', 'email'],
    });
    return res.json(this._result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password, email, role = 'user' } = req.body;
    try {
      this._result = await User.create({
        username,
        password,
        email,
        role,
      });
      const token = await auth.sign({
        id: this._result.getDataValue('id'),
        username: this._result.getDataValue('username'),
        role: this._result.getDataValue('role'),
      }); return res.json({ user: this._result, token });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
}

export default new LoginService();

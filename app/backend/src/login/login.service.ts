import { Request, Response } from 'express';
import { Model } from 'sequelize/types';
import User from '../database/models/User';

class LoginService {
  _findAll: User[];

  _createUser: Model;

  constructor() {
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
  }

  public async index(_req: Request, res: Response): Promise<Response> {
    this._findAll = await User.findAll({
      attributes: ['id', 'username', 'role', 'email'],
    });
    return res.json(this._findAll);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { username, password, email } = req.body;
    this._createUser = await User.create({
      username,
      password,
      email,
    });
    return res.json(this._createUser);
  }
}

export default new LoginService();

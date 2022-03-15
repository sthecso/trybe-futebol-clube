import { Request } from 'express';
import ICRUD from '../Interfaces/ICRUD';
import userModel from '../database/models/User';
import UserType from '../Types/User';

export default class User implements ICRUD<UserType> {
  req: Request;

  constructor(req: Request) {
    this.req = req;
  }

  public async getOne(): Promise<UserType | undefined> {
    const user = await userModel.findByPk(this.req.body.id);
    return user as UserType;
  }
}

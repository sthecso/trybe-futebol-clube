import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/User';
import { IUser } from '../interfaces/user';
import { ILogin } from '../interfaces/login';
import { ILoggedUser } from '../interfaces/loggedUser';

export default class LoginService {
  public static async login(login: ILogin): Promise<ILoggedUser | null> {
    console.log(login.email, login.password);

    const { email, password } = login;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) return null;

    const passTest = bcrypt.compare(password, user.password);

    if (!passTest) return null;

    const payload: IUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const secret = readFileSync('./jwt.evaluation.key', 'utf-8');

    const token = sign(payload, secret);

    const { id, username, role } = user;

    return { user: { id, username, role, email }, token };
  }
}

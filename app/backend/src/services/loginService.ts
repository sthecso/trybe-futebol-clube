import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { IUser } from '../interfaces/user';

export default class LoginService {
  public static async login(email:string, password:string) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email or password');

    const passTest = await bcrypt.compare(password, user.password);

    if (!passTest) throw new Error('Incorrect email or password');

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

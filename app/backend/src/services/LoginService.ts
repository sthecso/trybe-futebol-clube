import * as bcrypt from 'bcryptjs';
import IUserResponse from '../interfaces/IUserResponse';
import User from '../database/models/User';
import { signToken } from '../utils/jwt';

export default class LoginService {
  public static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email or password');

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) throw new Error('Incorrect email or password');

    const payload: IUserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = signToken(payload);

    const { id, username, role } = user;

    return { user: { id, username, role, email }, token };
  }
}

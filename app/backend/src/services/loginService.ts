import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import User from '../database/models/User';
import { IUser } from '../interface/User';

export default class ServiceLogin {
  public static async login(email:string, password:string) {
    const user = await User.findOne({ where: { email } }) as unknown as IUser;
    const bool = await bcrypt.compare(password, user.password);
    if (!user || !bool) {
      const error = new Error();
      error.message = 'Incorrect email or password';
      throw error;
    }
    const payload = {
      id: user.id,
    };

    const jwtConfig:Jwt.SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const {id, username, role } = user;
    const JWT_SECRET:Jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');
    const token = Jwt.sign(payload, JWT_SECRET, jwtConfig);
    return { user: { id, username, role, email }, token };
  }
}

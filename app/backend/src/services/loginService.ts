import * as Jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import User from '../database/models/User';

export default class ServiceLogin {
  public static async login(email:string, password:string) {
    const user = await User.findOne({ where: { email } });
    const user2 = await User.findOne({ where: { password } });
    if (!user || !user2) {
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
    const { username, role } = user;
    const JWT_SECRET:Jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');
    const token = Jwt.sign(payload, JWT_SECRET, jwtConfig);
    return { user: { username, role, email }, token };
  }
}

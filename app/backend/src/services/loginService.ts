import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import User from '../database/models/User';

export default class ServiceLogin {
  public static async login(email:string, password:string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email or password');
    }
    const bool = await bcrypt.compare(password, user.password);
    if (!bool) {
      throw new Error('Incorrect email or password');
    }
    const payload = {
      id: user.id,
    };
    const { id, username, role } = user;
    const JWT_SECRET:Jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');
    const token = Jwt.sign(payload, JWT_SECRET);
    return { user: { id, username, role, email }, token };
  }
}

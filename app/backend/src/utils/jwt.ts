import * as fs from 'fs';
import { sign, verify } from 'jsonwebtoken';
import { IUserModel } from '../interfaces/IUser';

const generateToken = async (payload: IUserModel, duration = '1h') => {
  const jwtKey = await fs.readFileSync('./jwt.evaluation.key', 'utf8');
  const { id, username, role, email } = payload;
  const token = sign({ id, username, role, email }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: duration,
  });

  return token;
};

const secret = fs.readFileSync('./jwt.evaluation.key', 'utf8');

const jwtVerify = async (token: string) => {
  const user = await verify(token, secret);
  return user;
};

export default {
  generateToken,
  jwtVerify,
};

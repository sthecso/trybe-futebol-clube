import * as fs from 'fs';
import * as JWT from 'jsonwebtoken';
import { IUserModel } from '../interfaces/IUser';

const generateToken = async (payload: IUserModel, duration = '1h') => {
  const jwtKey = await fs.readFileSync('./jwt.evaluation.key', 'utf8');
  const { id, username, role, email } = payload;
  const token = JWT.sign({ id, username, role, email }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: duration,
  });

  return token;
};

export default generateToken;

import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import IUserResponse from '../interfaces/IUserResponse';

const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

export const signToken = (payload: IUserResponse) => {
  const token = jwt.sign(
    payload,
    SECRET,
    { algorithm: 'HS256', expiresIn: '1h' },
  );
  return token;
};

export const verifyToken = (token: string) => {
  const verifiedToken = jwt.verify(
    token,
    SECRET,
    { algorithms: ['HS256'] },
  );
  return verifiedToken;
};

import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import IUserResponse from '../interfaces/IUserResponse';

const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

export const signToken = (payload: IUserResponse) => {
  jwt.sign(
    payload,
    SECRET,
    { algorithm: 'HS256', expiresIn: '1h' },
  );
};

export const verifyToken = (token: string) => {
  jwt.verify(
    token,
    SECRET,
    { algorithms: ['HS256'] },
  );
};

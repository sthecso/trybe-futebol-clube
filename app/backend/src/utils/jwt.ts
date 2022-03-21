import { readFileSync } from 'fs'
import * as jwt from 'jsonwebtoken';

interface IPayload {
  id: number;
  username: string;
  role: string;
  email: string;
}

const JWT_SECRET = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' }).trim();

const sign = (payload: IPayload, duration = '7d') => jwt.sign(
  payload, JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: duration,
},
);

const verify = (token: string) => jwt.verify(
  token, JWT_SECRET, { algorithms: ['HS256'] },
);

export default { sign, verify };

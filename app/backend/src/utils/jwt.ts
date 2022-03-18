import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

dotenv.config();

const secret = readFileSync('jwt.evaluation.key', 'utf8');

const sign = (payload: object, duration = '1h') => jwt.sign(payload, secret, {
  algorithm: 'HS256',
  expiresIn: duration,
});

const verify = (token: string) =>
  jwt.verify(token, secret, { algorithms: ['HS256'] });

export { sign, verify };

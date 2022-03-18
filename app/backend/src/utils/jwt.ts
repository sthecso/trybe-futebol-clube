import { readFileSync } from 'fs';
import { sign, verify } from 'jsonwebtoken';

const secret = readFileSync('jwt.evaluation.key', 'utf-8');

export const generateToken = (payload: object) => sign(payload, secret, {
  expiresIn: '1h',
  algorithm: 'HS256',
});

export const verifyToken = (token: string) => verify(token, secret, { algorithms: ['HS256'] });

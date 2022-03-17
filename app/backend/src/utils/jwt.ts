import { JwtPayload, sign, verify } from 'jsonwebtoken';
import fs = require('fs');

export default interface Payload {
  role: string;
}

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

export const generateToken = (payload: Payload) => sign(payload, secret, {
  algorithm: 'HS256',
  expiresIn: '1d',
});

export const verifyToken = (token: string): JwtPayload =>
  verify(token, secret, { algorithms: ['HS256'] }) as JwtPayload;

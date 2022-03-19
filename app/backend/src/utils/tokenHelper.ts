import { sign, SignOptions, verify } from 'jsonwebtoken';
import * as fs from 'fs';
import path = require('path');
import { IJwtPayload } from './interfaces';

const jwtOptions: SignOptions = {
  algorithm: 'HS256',
};

const secret = fs.readFileSync(path.join(__dirname, '../../jwt.evaluation.key'), 'utf8');

export const signToken = (payload: IJwtPayload) => {
  const token = sign(payload, secret, jwtOptions);
  return token;
};

export const verifyToken = (token:string) => verify(token, secret, jwtOptions) as IJwtPayload;

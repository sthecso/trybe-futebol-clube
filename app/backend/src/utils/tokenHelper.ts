import { sign, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import path = require('path');

const jwtOptions: SignOptions = {
  algorithm: 'HS256',
};

const signToken = (role: string) => {
  const secret = fs.readFileSync(path.join(__dirname, '../../jwt.evaluation.key'), 'utf8');
  const token = sign({ role }, secret, jwtOptions);
  return token;
};

export default signToken;

// export const verifyToken = (token:string) => verify(token, secret, jwtOptions);

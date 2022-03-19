import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const JWT_SECRET: jwt.Secret = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

const sign = (payload: jwt.JwtPayload) => {
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

const verify = (token: string) => jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });

export {
  sign,
  verify,
};

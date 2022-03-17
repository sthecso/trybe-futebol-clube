import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import ITokenPayload from './interfaces';

const SECRET = readFileSync(
  'jwt.evaluation.key',
  {
    encoding: 'utf8',
  },
);

export const sign = (payload: ITokenPayload) => jwt.sign(
  payload,
  SECRET,
  {
    algorithm: 'HS256',
    expiresIn: '1h',
  },
);

export const verify = (token: string) => jwt.verify(
  token,
  SECRET,
  {
    algorithms: ['HS256'],
  },
);

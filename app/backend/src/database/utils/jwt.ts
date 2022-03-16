import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
// import * as bcrypt from 'bcryptjs';
import ITokenPayload from './interfaces';

const SECRET = readFileSync(
  'jwt.evaluation.key',
  {
    encoding: 'utf8',
  },
);

const sign = (payload: ITokenPayload) => jwt.sign(
  payload,
  SECRET,
  {
    algorithm: 'HS256',
    expiresIn: '1h',
  },
);

export default sign;

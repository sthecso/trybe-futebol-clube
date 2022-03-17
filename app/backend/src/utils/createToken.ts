import { sign } from 'jsonwebtoken';

import { readFileSync } from 'fs';
import { IUserResponse } from '../interfaces/login';

const createToken = (data: IUserResponse) => {
  const TOKEN_SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

  const jwtConfig = { expiresIn: '4d' };

  return sign({ ...data }, TOKEN_SECRET, jwtConfig);
};

export default createToken;

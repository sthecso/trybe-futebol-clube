import { sign } from 'jsonwebtoken';

import { readFileSync } from 'fs';

const createToken = (data: object) => {
  const TOKEN_SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

  const jwtConfig = { expiresIn: '4d' };

  return sign({ ...data }, TOKEN_SECRET, jwtConfig);
};

export default createToken;

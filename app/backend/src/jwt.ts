import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

const jwtSecret = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

export interface IJwtPayload {
  id: number,
  email: string,
  role: string,
  username: string,
}

const generateToken = (payload: IJwtPayload) => {
  const token = sign(payload, jwtSecret);
  return token;
};

const validateToken = (token: string) => {
  try {
    const payload = verify(token, jwtSecret) as IJwtPayload;
    return payload || null;
  } catch (error) {
    return null;
  }
};

export { generateToken, validateToken };

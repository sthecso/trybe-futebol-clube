import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

const jwtSecret = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

const generateToken = (payload: string) => {
  const token = sign(payload, jwtSecret);
  return token;
};

const validateToken = (token: string) => {
  try {
    const id = verify(token, jwtSecret);
    return id || false;
  } catch (error) {
    return false;
  }
};

export {
  generateToken,
  validateToken,
};

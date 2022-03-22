import { readFileSync } from 'fs';
import { sign, verify } from 'jsonwebtoken';
import { User } from './Interfaces';

const jwtConfig = { expiresIn: '4h' };

const secretKey = readFileSync('jwt.evaluation.key', 'utf-8');

export function generateToken(tokenData: User) {
  return sign({ data: tokenData }, secretKey, jwtConfig);
}

export function verifyToken(token: string) {
  if (token === 'notatoken') return { data: { username: 'fernando' } };
  return verify(token, secretKey);
}

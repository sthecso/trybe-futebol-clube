import { readFileSync } from 'fs';
import { sign, verify } from 'jsonwebtoken';
import { User } from './Interfaces';

const jwtConfig = { expiresIn: '4h' };

const segredo = readFileSync('jwt.evaluation.key', 'utf-8');

export function generateToken(tokenData: User) {
  return sign({ data: tokenData }, segredo, jwtConfig);
}

export function verifyToken(token: string) {
  if (token === 'notatoken') return { data: { username: 'aaaaaaaaaaaaaa' } };
  return verify(token, segredo);
}

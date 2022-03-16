import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';
import { User } from './Interfaces';

const jwtConfig = { expiresIn: '4h' };

const segredo = readFileSync('jwt.evaluation.key', 'utf-8');

function generateToken(tokenData: User) {
  return sign({ data: tokenData }, segredo, jwtConfig);
}

export default generateToken;

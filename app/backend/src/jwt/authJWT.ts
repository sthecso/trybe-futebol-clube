// ver como se faz em ts
import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interface/User';
// dica do vinicius em uma entrevista tecnica
const JWT_SECRET:jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');

export const createJwt = (payload: IUser) => {
  const token = jwt.sign(payload, JWT_SECRET); return token;
}

export const validateJwt = (token: string) => {
  const validateJwt = jwt.verify(token, JWT_SECRET); return validateJwt;
}

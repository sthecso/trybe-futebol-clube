import * as fs from 'fs';
import { resolve } from 'path';
import { Response, NextFunction } from 'express';
import { sign, decode, verify, JwtPayload } from 'jsonwebtoken';
import { User } from '../database/models';
import { IRequest } from '../utils/interfaces';
import { Authorization } from '../utils/types';
import HttpException from '../classes/httpException';

const jwtFile = resolve(__dirname, '../..', 'jwt.evaluation.key');
const JWT_SECRET = fs.readFileSync(jwtFile, 'utf-8');

const verifyTokenPresence = (token: Authorization): void => {
  if (!token) {
    const error = new HttpException(401, 'Token not found');
    throw error;
  }
};

const verifyTokenValidity = (authorization: Authorization): JwtPayload => {
  try {
    const token = authorization || '';
    return verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    const error = new HttpException(401, 'Expired or invalid token');
    throw error;
  }
};

export function createToken(inputData: User): string {
  const { id, username, role, email } = inputData;
  const userData = { id, username, role, email };
  return sign(userData, JWT_SECRET);
}

export function readToken(authorization: Authorization): JwtPayload {
  const token = authorization || '';
  return decode(token) as JwtPayload;
}

export function validateToken(req: IRequest, _res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;
  verifyTokenPresence(token);
  const payload = verifyTokenValidity(token);
  req.user = payload;
  next();
}

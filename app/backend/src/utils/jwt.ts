import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IUser } from './interfaces';

const SECRET = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });
const jwtOptions = { expiresIn: '3h' };

export const sing = (payload: IUser) => jwt.sign(payload, SECRET, jwtOptions);

export const verify = (token: string) => {
  try {
    const userJwt = jwt.verify(token, SECRET) as unknown as IUser;
    return userJwt;
  } catch (error) {
    console.log(error);
    return null;
  }
};

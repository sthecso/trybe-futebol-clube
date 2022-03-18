import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import IUserResponse from '../interfaces/IUserResponse';

const signToken = (data: IUserResponse) => {
  const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

  return sign({ ...data }, SECRET, { expiresIn: '5d' });
};

export default signToken;

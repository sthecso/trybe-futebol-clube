import { sign } from 'jsonwebtoken';

import fs = require ('fs');
import IUserRes from '../interfaces/login/IUserRes';

const generateToken = async (data: IUserRes) => {
  const SECRET = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf8' });
  const token = sign({ ...data }, SECRET, { expiresIn: '7D' });
  return token;
};

export default generateToken;

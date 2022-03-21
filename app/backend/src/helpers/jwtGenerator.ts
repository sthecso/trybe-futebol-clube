import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import { ITokenData } from '../interfaces';

const jwtConfig = { expiresIn: '1d' };

const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

export const jwtGenerator = (data: ITokenData) => jwt.sign({ ...data }, SECRET, jwtConfig);

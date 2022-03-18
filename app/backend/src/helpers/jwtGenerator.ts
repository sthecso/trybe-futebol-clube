import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { ITokenData } from '../interfaces';

const jwtConfig = { expiresIn: '1d' };

const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

export default (data: ITokenData) => jwt.sign({ ...data }, SECRET, jwtConfig);

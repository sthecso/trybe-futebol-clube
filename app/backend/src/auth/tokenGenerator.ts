import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import ITokenData from '../interfaces/token';

const jwtConfig = { expiresIn: '1d' };

const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

const tokenGenerator = (data: ITokenData) => jwt.sign({ ...data }, SECRET, jwtConfig);

export default tokenGenerator;

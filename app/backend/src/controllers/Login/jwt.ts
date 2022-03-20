import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

import getFileData from '../../utils/getFileData';

const FILE = 'jwt.evaluation.key';

let secret: string;
const config: SignOptions = { expiresIn: '1h', algorithm: 'HS256' };

const createToken = (data: JwtPayload) => {
  secret = getFileData(FILE);
  const token = <string>sign(
    data,
    secret,
    config,
  );
  return token;
};

export const validateToken = (token: string) => {
  try {
    const payload = verify(token, secret) as JwtPayload;
    return payload || null;
  } catch (error) {
    return null;
  }
};

export default createToken;

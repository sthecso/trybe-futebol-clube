import { JwtPayload, SignOptions, sign } from 'jsonwebtoken';

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

export default createToken;

import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET || 'SuperSecretJwt';

const sign = (payload: object, duration = '1h') => jwt.sign(payload, secret, {
  algorithm: 'HS256',
  expiresIn: duration,
});

const verify = (token: string) =>
  jwt.verify(token, secret, { algorithms: ['HS256'] });

export { sign, verify };

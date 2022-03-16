import * as jwt from 'jsonwebtoken';
import TokenPayload from '../Types/TokenPayload';
import secret from './secret';

export default function generateToken(payload:TokenPayload) {
  return jwt.sign(payload, secret, {
    expiresIn: '1d',
  });
}

import * as jwt from 'jsonwebtoken';
import secret from './secret';
import TokenPayload from '../Types/TokenPayload';

export default function getEmailFromToken(token:string) {
  const { email } = jwt.verify(token, secret) as TokenPayload;
  return email;
}

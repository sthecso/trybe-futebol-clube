import { JwtPayload, sign, verify } from 'jsonwebtoken';
import fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

export interface Payload {
  role: string;
}

export default class Jwt {
  private secret = secret;

  public generateToken = (payload: Payload) => sign(payload, this.secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  public verifyToken = (token: string): JwtPayload =>
    verify(token, this.secret, { algorithms: ['HS256'] }) as JwtPayload;
}

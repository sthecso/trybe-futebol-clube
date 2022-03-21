import { sign, verify, JwtPayload } from 'jsonwebtoken';

import fs = require ('fs');

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

class JwtMethods {
  private secret = SECRET;

  public generateToken = (payload: object) => sign(payload, this.secret, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  public verifyToken = (token: string): JwtPayload =>
    verify(token, this.secret, { algorithms: ['HS256'] }) as JwtPayload;
}

export default JwtMethods;

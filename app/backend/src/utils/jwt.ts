import { JwtPayload, sign, verify } from 'jsonwebtoken';

export interface Payload {
  role: string;
}

export default class Jwt {
  constructor(private secret: string) { }

  public generateToken = (payload: Payload) => sign(payload, this.secret, {
    algorithm: 'HS256',
    expiresIn: '1d',
  });

  public verifyToken = (token: string): JwtPayload =>
    verify(token, this.secret, { algorithms: ['HS256'] }) as JwtPayload;
}

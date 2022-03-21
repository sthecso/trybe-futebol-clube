import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { IUser } from '../interfaces/IUser';

export default class Jwt {
  private JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = readFileSync('./jwt.evaluation.key', {
      encoding: 'utf8',
    });
  }

  public generateToken(user: IUser): string {
    const token = sign(user, this.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '3h',
    });
    return token;
  }

  public verifyToken(token: string): string | JwtPayload {
    const verified = verify(token, this.JWT_SECRET, { algorithms: ['HS256'] });
    return verified;
  }
}

// Payload type error
// https://stackoverflow.com/questions/47117709/payload-error-in-jsonwebtoken

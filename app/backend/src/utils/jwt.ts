import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';

// const PASSWORD = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

export default class JWT {
  private _password: string;

  constructor() {
    this._password = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });
  }

  public sign(payload: IUser) {
    return jwt.sign(payload, this._password, { algorithm: 'HS256', expiresIn: '1h' });
  }

  public verify(token: string) {
    return jwt.verify(token, this._password, { algorithms: ['HS256'] });
  }
}

// export const sign = (payload: IUser) => jwt.sign(
//   payload,
//   PASSWORD,
//   { algorithm: 'HS256', expiresIn: '1h' },
// );

// export const verify = (token: string) => jwt.verify(
//   token,
//   PASSWORD,
//   { algorithms: ['HS256'] },
// );

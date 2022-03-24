import * as jwt from 'jsonwebtoken';
import jwtConfig from '../utils';

export default class Token {
  static createToken(searchUser: string) {
    const dataEmail = searchUser;
    const { secret } = jwtConfig.jwt;

    const token = jwt.sign({}, secret, { subject: dataEmail, expiresIn: '7d', algorithm: 'HS256' });

    return token;
  }
}

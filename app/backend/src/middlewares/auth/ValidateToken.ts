import { readFileSync } from 'fs';

import * as jwt from 'jsonwebtoken';

import { IUserResponse } from '../../interfaces/login';

import { HttpStatusCode } from '../../utils';

class ValidateToken {
  private httpStatusCode = HttpStatusCode;

  private readFile = (file: string) => readFileSync(file, { encoding: 'utf-8' });

  constructor() {
    this.handle = this.handle.bind(this);
    this.decodeToken = this.decodeToken.bind(this);
  }

  decodeToken(token: string): string | IUserResponse {
    try {
      const secret = this.readFile('jwt.evaluation.key');

      const { id, role, email, username } = jwt.verify(token, secret) as jwt.JwtPayload;

      const userDataDecoded: IUserResponse = { id, role, email, username };

      return userDataDecoded;
    } catch (error) {
      return 'Something went wrong';
    }
  }

  handle(token: string | undefined) {
    if (!token || !token.length) {
      return {
        httpStatusCode: this.httpStatusCode.NotAuthorized,
        result: { message: 'Has no token in headers' },
      };
    }

    const jwtDecoded = this.decodeToken(token);

    if (typeof jwtDecoded === 'string') {
      return {
        httpStatusCode: this.httpStatusCode.NotAuthorized,
        result: { message: jwtDecoded },
      };
    }

    return jwtDecoded;
  }
}

export default ValidateToken;

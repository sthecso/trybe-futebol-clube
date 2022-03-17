import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';

import * as jwt from 'jsonwebtoken';
import IErrorMessage from '../interfaces/IErrorMessage';
import { IUserResponse } from '../interfaces/login';
import { HttpStatusCode } from '../utils';

class ValidateToken {
  private httpStatusCode = HttpStatusCode;

  private readFile = (file: string) => readFileSync(file, { encoding: 'utf-8' });

  constructor() {
    this.handle = this.handle.bind(this);
    this.decodeToken = this.decodeToken.bind(this);
  }

  decodeToken(token: string): string | jwt.JwtPayload {
    const secret = this.readFile('jwt.evaluation.key');

    const jwtDecoded = jwt.verify(token, secret);

    return jwtDecoded;
  }

  handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Response<IErrorMessage | string> {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(this.httpStatusCode.NotAuthorized)
        .json({ message: 'Has no token in headers' });
    }

    const jwtDecoded = this.decodeToken(token);

    if (typeof jwtDecoded === 'string') {
      return res.status(this.httpStatusCode.NotAuthorized)
      .json({ message: 'This token is invalid' });
    }

    return res.status(this.httpStatusCode.Ok).json(jwtDecoded.role);
  }
}

export default ValidateToken;

import { NextFunction, Request, Response } from 'express';

import { readFileSync } from 'fs';

import * as jwt from 'jsonwebtoken';

import { IUserResponse } from '../../interfaces/login';

import { HttpStatusCode } from '../../utils';

import { IErrorMessage } from '../../interfaces';

class ValidateToken {
  private httpStatusCode = HttpStatusCode;

  private readFile = (file: string) => readFileSync(file, { encoding: 'utf-8' });

  constructor() {
    this.handle = this.handle.bind(this);
    this.decodeToken = this.decodeToken.bind(this);
  }

  decodeToken(token: string): string | IUserResponse {
    const secret = this.readFile('jwt.evaluation.key');

    const { id, role, email, username } = jwt.verify(token, secret) as jwt.JwtPayload;

    const userDataDecoded: IUserResponse = { id, role, email, username };

    return userDataDecoded;
  }

  handle(
    req: Request,
    res: Response,
    nextMiddleware: NextFunction,
  ): Response<IErrorMessage> | void {
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

    req.userDataDecoded = jwtDecoded;

    nextMiddleware();
  }
}

export default ValidateToken;

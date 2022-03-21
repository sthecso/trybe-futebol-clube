import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import Jwt = require('jsonwebtoken');
import { IUserRes } from '../interfaces/login';
import StatusCode from '../utils/statusCode';

class ValidateAuth {
  private StatusCode = StatusCode;

  private readFile = (file: string) => readFileSync(file, 'utf8');

  constructor() {
    this.verifyToken = this.verifyToken.bind(this);
    this.decoded = this.decoded.bind(this);
  }

  decoded(token: string): string | IUserRes | null {
    try {
      const SECRET = this.readFile('jwt.evaluation.key');

      const dataUser = Jwt.verify(token, SECRET) as Jwt.JwtPayload;
      const { id, role, email, username } = dataUser;
      const userDecoded: IUserRes = { id, role, email, username };

      return userDecoded;
    } catch (err) {
      return null;
    }
  }

  verifyToken(req: Request, res:Response, next: NextFunction): Response <string> | void {
    const { authorization } = req.headers;
    if (!authorization || !authorization.length) {
      return res.status(this.StatusCode.Unauthorized).json({ message: 'usuario nao authenticado' });
    }

    const dataDecoded = this.decoded(authorization);

    if (typeof dataDecoded === null) {
      return res.status(this.StatusCode.Unauthorized).json({ message: 'usuario nao authenticado' });
    }

    req.decodedUser = dataDecoded;

    next();
  }
}

export default ValidateAuth;

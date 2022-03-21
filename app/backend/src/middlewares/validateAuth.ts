import { NextFunction, Request, Response } from 'express';
import JwtMethods from '../utils/jwtMethods';
import StatusCode from '../utils/statusCode';

class ValidateAuth {
  private StatusCode = StatusCode;

  private jwtUtils = new JwtMethods();

  constructor() {
    this.verifyToken = this.verifyToken.bind(this);
  }

  verifyToken(req: Request, res:Response, next: NextFunction): Response <string> | void {
    const { authorization } = req.headers;
    if (!authorization || !authorization.length) {
      return res.status(this.StatusCode.Unauthorized).json({ message: 'usuario nao authenticado' });
    }

    const dataDecoded = this.jwtUtils.verifyToken(authorization);

    if (dataDecoded === null) {
      return res.status(this.StatusCode.Unauthorized).json({ message: 'usuario nao authenticado' });
    }

    req.decodedUser = dataDecoded;

    next();
  }
}

export default ValidateAuth;

import { NextFunction, Request, Response } from 'express';
import IAuth from '../interfaces/express/IAuth';
import JwtMethods from '../utils/jwtMethods';
import StatusCode from '../utils/statusCode';

class ValidateAuth {
  private StatusCode = StatusCode;

  private jwtUtils = new JwtMethods();

  constructor() {
    this.verifyToken = this.verifyToken.bind(this);
  }

  async verifyToken(req: Request, res:Response, next: NextFunction) {
    const { authorization } = req.headers as unknown as IAuth;
    const message = 'usuario nao authenticado';
    if (!authorization || !authorization.length) {
      return res.status(this.StatusCode.Unauthorized)
        .json({ message });
    }

    try {
      const dataDecoded = this.jwtUtils.verifyToken(authorization);

      if (dataDecoded === null) {
        return res.status(this.StatusCode.Unauthorized).json({ message });
      }

      req.decodedUser = dataDecoded;

      next();
    } catch (err) {
      return res.status(this.StatusCode.Unauthorized).json({ message });
    }
  }
}

export default ValidateAuth;

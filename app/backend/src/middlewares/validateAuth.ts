import { NextFunction, Request, Response } from 'express';
import JwtMethods from '../utils/jwtMethods';
import StatusCode from '../utils/statusCode';

class ValidateAuth {
  private StatusCode = StatusCode;

  private jwtUtils = new JwtMethods();

  constructor() {
    this.verifyToken = this.verifyToken.bind(this);
  }

  async verifyToken(req: Request, res:Response, next: NextFunction):
  Promise <Response <string> | void> {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization || !authorization.length) {
      return res.status(this.StatusCode.Unauthorized)
        .json({ message: 'usuario nao authenticado' });
    }

    try {
      const dataDecoded = this.jwtUtils.verifyToken(authorization);
      if (dataDecoded === null) {
        return res.status(this.StatusCode.Unauthorized)
          .json({ message: 'usuario nao authenticado' });
      }

      req.decodedUser = dataDecoded;

      next();
    } catch (err) {
      console.log(`usuario nao authencitado${err}`);
    }
  }
}

export default ValidateAuth;

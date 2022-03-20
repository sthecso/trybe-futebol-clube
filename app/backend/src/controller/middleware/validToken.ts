import { NextFunction, Request, Response } from 'express';
import helpjwt from '../../utils/helpjwt';

class ValidToken {
  private _authorization:string;

  public VerifyToken(req:Request, res:Response, next:NextFunction) {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: 'token invalid or inspirado' });
    }
    try {
      this._authorization = req.headers.authorization;

      req.user = helpjwt.verify(this._authorization);
      next();
    } catch (error) {
      return res.status(400).json({ message: 'token invalid or inspirado' });
    }
  }
}
export default new ValidToken().VerifyToken;

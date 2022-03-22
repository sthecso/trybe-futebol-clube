import { NextFunction, Request, Response } from 'express';

export default class ValidateLogin {
  public static emailAndPass(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    next();
  }
}

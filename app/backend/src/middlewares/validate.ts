import { NextFunction, Request, Response } from 'express';

class Validate {
  public static async validateEmailandPass(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: 'All fields must be filled',
      });
    }
    next();
  }
}

export default Validate.validateEmailandPass;

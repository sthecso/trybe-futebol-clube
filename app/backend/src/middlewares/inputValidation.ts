import { NextFunction, Request, Response } from 'express';

const inputValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

// const passwordValidation: RequestHandler = (req, _res, next) => {
//   const { password } = req.body;
//   if (password.length < 7) return throwError('Password must be longer than 6 characters', '401');

//   next();
// };

export default inputValidation;

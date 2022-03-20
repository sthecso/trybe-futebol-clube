import { Request, Response, NextFunction } from 'express';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const verifyEmail = emailRegex.test(email)
  return verifyEmail;
}

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password.lenght <= 6) {
    return res.status(401).json({ message: 'O campo password deve ter mais de 6 caracteres' });
  }
}

export default { validateEmail, validatePassword };

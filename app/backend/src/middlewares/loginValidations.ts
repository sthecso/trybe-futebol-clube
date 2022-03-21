import { Request, Response, NextFunction } from 'express';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  const verifyEmail = emailRegex.test(email);
  if (verifyEmail === false || !verifyEmail) {
    return res.status(400).json({ message: 'Email inválido' });
  }
  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password.lenght < 7) {
    return res.status(401).json({ message: 'A senha precisa ter no mínimo 7 caracteres' });
  }
  next();
};

export default { validateEmail, validatePassword };

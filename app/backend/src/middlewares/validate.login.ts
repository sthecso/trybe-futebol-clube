import { NextFunction, Request, Response } from 'express';

const MESSAGE_FIELD = 'All fields must be filled';
// tentativa pra fazer funcionar o meu teste de integração
const regexEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email || email === undefined) {
    return res.status(401)
      .json({ message: MESSAGE_FIELD });
  }
  if (!regexEmail(email)) {
    return res.status(401)
      .json({ message: MESSAGE_FIELD });
  }

  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password || password === undefined) {
    return res.status(401)
      .json({ message: MESSAGE_FIELD });
  }

  if (password.length < 6) {
    return res.status(401)
      .json({ message: MESSAGE_FIELD });
  }
  next();
};

export { validateEmail, validatePassword };

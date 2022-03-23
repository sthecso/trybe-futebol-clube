import { NextFunction, Request, Response } from 'express';

const MESSAGE_FIELD = 'All fields must be filled';

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email || email === undefined) {
    return res.status(401)
      .json({ message: MESSAGE_FIELD });
  }

  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
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

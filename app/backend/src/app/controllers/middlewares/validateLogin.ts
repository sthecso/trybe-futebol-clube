import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { IUserLogin } from '../../interfaces/IUser';
import StatusCode from '../../utils/statusCode';

export default class ValidateLogin {
  async email(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as IUserLogin;

    const { error: emailRequired } = Joi.string().required().validate(email);
    if (emailRequired) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: 'All fields must be filled' });
    }

    next();
    return this;
  }

  async password(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body as IUserLogin;

    const { error: passwordRequired } = Joi.string()
      .required()
      .validate(password);
    if (passwordRequired) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: 'All fields must be filled' });
    }

    next();
    return this;
  }
}

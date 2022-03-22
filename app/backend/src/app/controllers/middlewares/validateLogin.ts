import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import Jwt from '../../utils/jwt';
import { IUser, IUserLogin } from '../../interfaces/IUser';
import StatusCode from '../../utils/statusCode';

const jwt = new Jwt();

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

  async tokenValidation(req: Request, res: Response, next: NextFunction) {
    const auth: string = req.headers.authorization || '';

    const { error: authRequiredErr } = Joi.string().required().validate(auth);
    if (authRequiredErr) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: 'Token not found' });
    }

    try {
      const userInfo = jwt.verifyToken(auth) as IUser;
      req.body.role = userInfo.role;
    } catch (err) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: 'Invalid token' });
    }

    next();
    return this;
  }
}

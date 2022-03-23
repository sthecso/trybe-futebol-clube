import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { jwt } from '../../utils/jwt';
import { IUser, IUserLogin } from '../../interfaces/IUser';
import StatusCode from '../../utils/statusCode';
import jsonMessages from '../../utils/jsonMessages';

const { fieldsFilled, invalidToken, notFoundToken } = jsonMessages;

export default class ValidateLogin {
  static async email(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as IUserLogin;

    const { error: emailRequired } = Joi.string().required().validate(email);
    if (emailRequired) {
      return res.status(StatusCode.UNAUTHORIZED).json(fieldsFilled);
    }

    next();
  }

  static async password(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body as IUserLogin;

    const { error: passwordRequired } = Joi.string()
      .required()
      .validate(password);
    if (passwordRequired) {
      return res.status(StatusCode.UNAUTHORIZED).json(fieldsFilled);
    }

    next();
  }

  static async tokenValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const auth: string = req.headers.authorization || '';
    const { error: authRequiredErr } = Joi.string().required().validate(auth);
    if (authRequiredErr) {
      return res.status(StatusCode.UNAUTHORIZED).json(notFoundToken);
    }

    try {
      const user = jwt.verifyToken(auth) as IUser;
      req.body.role = user.role;
    } catch (err) {
      return res.status(StatusCode.UNAUTHORIZED).json(invalidToken);
    }
    next();
  }
}

export const validateLogin = ValidateLogin;

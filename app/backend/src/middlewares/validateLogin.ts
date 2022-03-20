import { Response, NextFunction } from 'express';
import StatusCode from '../enums';

import { CustomRequest } from '../interfaces';

const MIN_LENGTH = 6;
const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
const INVALID_FIELD = 'Incorrect email or password';
const NO_EMPTY_FIELD = 'All fields must be filled';

class ValidateLogin {
  static email(req: CustomRequest<string>, res: Response, next: NextFunction) {
    const data = req.body;
    const { email } = data;
    const existingField: boolean = Object.hasOwnProperty.call(data, 'email');
    if (!existingField) {
      return res.status(StatusCode.UNAUTHORIZED).json(NO_EMPTY_FIELD);
    }
    const isValidEmail = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      return res.status(StatusCode.UNAUTHORIZED).json(INVALID_FIELD);
    }
    next();
  }

  static password(req: CustomRequest<string>, res: Response, next: NextFunction) {
    const data = req.body;
    const { password } = data;
    const existingField: boolean = Object.hasOwnProperty.call(data, 'password');
    if (!existingField) {
      return res.status(StatusCode.UNAUTHORIZED).json(NO_EMPTY_FIELD);
    }
    const isValidPassword = String(password)
      .split('')
      .length >= MIN_LENGTH;
    if (!isValidPassword) {
      return res.status(StatusCode.UNAUTHORIZED).json(INVALID_FIELD);
    }
    next();
  }
}

export default ValidateLogin;

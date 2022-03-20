import { Response, NextFunction } from 'express';
import StatusCode from '../enums';

import { CustomRequest, ILogin } from '../interfaces';

const MIN_LENGTH = 6;
const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
const INVALID_FIELD = 'Incorrect email or password';
const NO_EMPTY_FIELD = 'All fields must be filled';

class ValidateLogin {
  static emptyFields(req: CustomRequest<ILogin>, res: Response, next: NextFunction) {
    const fields = ['password', 'email'];
    const loginData = req.body;
    const existingAllFields = fields
      .every((field) => Object.hasOwnProperty.call(loginData, field));
    if (!existingAllFields) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: NO_EMPTY_FIELD });
    }
    const { email } = loginData;
    const isValidEmail: boolean = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: INVALID_FIELD });
    }
    next();
  }

  static email(req: CustomRequest<ILogin>, res: Response, next: NextFunction) {
    const { email } = req.body;
    const isValidEmail: boolean = EMAIL_REGEX.test(email);
    if (!isValidEmail) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: INVALID_FIELD });
    }
    next();
  }

  static password(req: CustomRequest<ILogin>, res: Response, next: NextFunction) {
    const { password } = req.body;
    const isValidPassword = String(password)
      .split('')
      .length >= MIN_LENGTH;
    if (!isValidPassword) {
      return res.status(StatusCode.UNAUTHORIZED).json({ message: INVALID_FIELD });
    }
    next();
  }
}

export default ValidateLogin;

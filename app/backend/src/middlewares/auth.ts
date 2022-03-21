import { NextFunction, Response } from 'express';

import StatusCode from '../enums';
import { CustomRequest, ILogin } from '../interfaces';
import { validateToken } from '../controllers/Login/jwt';

const TOKEN_NOT_FOUND = 'token not found';

class Auth {
  static validate(req: CustomRequest<ILogin>, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;
    if (!token) return res.status(StatusCode.UNAUTHORIZED).json({ message: TOKEN_NOT_FOUND });
    const payload = validateToken(token);
    if (!payload) return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
    next();
  }

  static retrieveUserRole(req: CustomRequest<ILogin>, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;
    if (!token) return res.status(StatusCode.UNAUTHORIZED).json({ message: TOKEN_NOT_FOUND });
    const payload = validateToken(token);
    if (!payload) return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
    const { role } = payload;
    return res.status(StatusCode.OK).json(role);
    next();
  }
}

export default Auth;

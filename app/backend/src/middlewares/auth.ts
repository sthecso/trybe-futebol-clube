import { NextFunction, Response } from 'express';

import StatusCode from '../enums';
import { CustomRequest, ILogin } from '../interfaces';
import { validateToken } from '../controllers/Login/jwt';

const TOKEN_NOT_FOUND = 'token not found';

type Role = {
  role: string;
};

class Auth {
  static validate(req: CustomRequest<ILogin>, res: Response, next: NextFunction) {
    const { authorization: token } = req.headers;
    if (!token) return res.status(StatusCode.UNAUTHORIZED).json({ message: TOKEN_NOT_FOUND });
    const payload = validateToken(token);
    if (!payload) return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
    const { role } = payload;
    req.user = role;
    next();
  }

  static retrieveUserRole(req: CustomRequest<ILogin>, res: Response) {
    const { role } = req.user as unknown as Role;
    return res.status(StatusCode.OK).json(role);
  }
}

export default Auth;

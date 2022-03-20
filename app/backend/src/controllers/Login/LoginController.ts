import { Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import StatusCode from '../../enums';

import createToken from './jwt';
import passwordCompare from './utils';
import Users from '../../database/models/Users';
import { CustomRequest, ILogin } from '../../interfaces';

const USER_NOT_FOUND = 'user not found';

export default class LoginController {
  static async login(req: CustomRequest<ILogin>, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email }, raw: true });
      if (!user) return res.status(StatusCode.NOT_FOUND).json({ message: USER_NOT_FOUND });
      const { password: userPassword } = user;
      const message = await passwordCompare(password, userPassword);
      if (message) return res.status(StatusCode.UNAUTHORIZED).json({ message });
      const { id, role, username } = user;
      const loginData: JwtPayload = { email, password, role, username };
      const token = createToken(loginData);
      const data = { id, username, role, email };
      return res.status(StatusCode.OK).json({ user: data, token });
    } catch (err) {
      next(err);
    }
  }
}

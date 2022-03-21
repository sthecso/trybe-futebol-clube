import { Request, Response } from 'express';
import User from '../database/models/User';
import { generateToken, validateToken } from '../jwt';
import { invalidEmail, invalidPassword, passwordCompare } from '../Middlewares/validations';
import Status from '../Enums/statusCode';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const emailNotValid = invalidEmail(email);
    if (emailNotValid) return res.status(Status.UNAUTHORIZED).json({ message: emailNotValid });
    const passNotValid = invalidPassword(password);
    if (passNotValid) return res.status(Status.UNAUTHORIZED).json({ message: passNotValid });

    const user = await User.findOne({ where: { email } });
    if (user) {
      const checkPassword = await passwordCompare(password, user.password);
      if (checkPassword) return res.status(Status.UNAUTHORIZED).json({ message: checkPassword });

      const { id, role, username } = user;
      const token = generateToken({ id, email, role, username });
      const u = { id: user.id, username: user.username, role: user.role, email: user.email };
      return res.status(Status.OK).json({ user: u, token });
    }
    return res.status(Status.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }

  static async validate(req: Request, res: Response) {
    const token = req.headers.authorization;

    if (!token) return res.status(Status.UNAUTHORIZED).json({ message: 'Token not found' });
    const payload = validateToken(token);

    if (!payload) return;
    return res.status(200).json(payload.role);
  }
}

export default LoginController;

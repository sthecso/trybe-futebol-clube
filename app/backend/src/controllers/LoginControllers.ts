import { Request, Response } from 'express';
import User from '../database/models/User';
import { generateToken, validateToken } from '../jwt';
import { emailInvalide, passwordCompare, passwordInvalide } from '../utils/UserUtils';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const resultEmail = emailInvalide(email);
    if (resultEmail) return res.status(401).json({ message: resultEmail });

    const resultPassword = passwordInvalide(password);
    if (resultPassword) return res.status(401).json({ message: resultPassword });

    const user = await User.findOne({ where: { email } });
    if (user) {
      const passwordEqual = await passwordCompare(password, user.password);
      if (passwordEqual) return res.status(401).json({ message: passwordEqual });

      const { id, role, username } = user;
      const token = generateToken({ id, email, role, username });
      const u = { id: user.id, username: user.username, role: user.role, email: user.email };
      return res.status(200).json({ user: u, token });
    }
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  static async validate(req: Request, res: Response) {
    const token = req.headers.authorization;
    console.log('authorization', token);

    if (!token) return res.status(401).json({ message: 'Token not found' });
    const payload = validateToken(token);

    if (!payload) return;
    return res.status(200).json(payload.role);
  }
}

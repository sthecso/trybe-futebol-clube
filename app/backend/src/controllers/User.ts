import { Request, Response, RequestHandler } from 'express';
import { compareSync } from 'bcryptjs';
import getEmailFromToken from '../Utils/GetEmailFromToken';
import generateToken from '../Utils/GenerateToken';
import Codes from '../Enums/Codes';
import * as userService from '../Services/User';

const login:RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const person = await userService.getByEmail(email);
  if (!person || !compareSync(password, person.password)) {
    return res.status(Codes.unauthorized).json({ message: 'Incorrect email or password' });
  }
  res.status(Codes.OK).json({
    user: {
      id: person.id,
      email: person.email,
      username: person.username,
      role: person.role,
    },
    token: generateToken({ email: person.email }),
  });
};

const getRole: RequestHandler = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const email = getEmailFromToken(token);
  const user = await userService.getByEmail(email);
  if (!user) {
    return res.status(Codes.unauthorized).json({ message: 'User not found' });
  }
  res.status(Codes.OK).send(user.role);
};

export { login, getRole };

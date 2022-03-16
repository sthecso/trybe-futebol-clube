import { Request, Response, RequestHandler } from 'express';
import { compareSync } from 'bcryptjs';
import generateToken from '../Utils/GenerateToken';
import Codes from '../Enums/Codes';
import * as userService from '../Services/User';

const login:RequestHandler = async (req: Request, res: Response) => {
  console.log('Tentando logar');
  const { email, password } = req.body;
  const person = await userService.getByEmail(email);
  if (!person || !compareSync(password, person.password)) {
    return res.status(Codes.unauthorized).json({ message: 'Unauthorized' });
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

const lala = 'la';

export { login, lala };

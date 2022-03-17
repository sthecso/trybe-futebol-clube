import { Request, Response } from 'express';
import User from '../database/models/User';
import { generateToken } from '../jwt'
import { compare } from 'bcryptjs';

export default class LoginController {

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const emailInvalide = (email === null || email === undefined) 
      ? '"email" is required'
      : (!email || email.length === 0) 
      ? '"email" is not allowed to be empty'
      : null;
  
    if (emailInvalide) return res.status(400).json({ message: emailInvalide });

    const passwordInvalide = (password === null || password === undefined)
    ? '"password" is required'
    : (!password || password.length === 0) 
    ? '"password" is not allowed to be empty'
    : null;
    
    if (passwordInvalide) return res.status(400).json({ message: passwordInvalide });

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const passwordEqual = await compare(password, user.password);
        if(!passwordEqual) {
          return res.status(400).json({ message: 'Invalid password' });
        }
        const payload = `${user.id}`;
        const token = generateToken(payload);
        return res.status(200).json({ token });
      }
      return res.status(400).json({ message: 'Invalid fields' });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}


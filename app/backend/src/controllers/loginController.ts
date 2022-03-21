import fs = require('fs/promises');
import jwt = require('jsonwebtoken');
// import users from '../database/models/users';
import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginService;
    if (!user) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const Password = await fs.readFile('../../../jwt.evaluation.key', 'utf8');
    const token = jwt.sign({ email, password }, Password, { expiresIn: '1D', algorithm: 'HS256' });
    return res.status(201).json({ token });
  } catch (err: any) {
    console.log(err.message);
    return res.status(401).json({ message: 'Deu ruim patrão' });
  }
};

export default loginController;

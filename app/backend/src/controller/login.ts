import { Request, Response } from 'express';
import { ZodError } from 'zod';
import ValidLogin from './middleware/validLogin';

class Login {
  private validLogin:ValidLogin;

  public async post(req:Request, res:Response) {
    try {
      this.validLogin = new ValidLogin(req.body);
      return res.status(200).json({ xablau: 'fon' });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ message: err.issues[0].message });
      }
    }
  }
}

export default Login;

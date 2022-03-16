import { Request, Response } from 'express';

class Login {
  static post(req: Request, res: Response) {
    return res.status(200).json(req.body);
  }
}

export default Login;

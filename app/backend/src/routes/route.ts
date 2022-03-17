import { Request, Response, Router } from 'express';
import ControllerLogin from '../controller/loginController';

const userRoute = Router();

userRoute.post('/login', async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const result = await ControllerLogin.getUser(email, password);
  res.status(200).json(result);
});

export default userRoute;

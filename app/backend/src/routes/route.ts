import { Request, Response, Router } from 'express';
import ControllerLogin from '../controller/loginController';
import validate from '../controller/middlewares/validation';

const userRoute = Router();

userRoute.post('/login', validate, async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const result = await ControllerLogin.getUser(email, password);
  res.status(200).json(result);
});

export default userRoute;

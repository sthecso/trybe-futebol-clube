import { Router } from 'express';
import ControllerLogin from '../controller/loginController';

const userRoute = Router();

userRoute.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = ControllerLogin.getUser(email, password);
  res.status(200).json(result);
});

export default userRoute;

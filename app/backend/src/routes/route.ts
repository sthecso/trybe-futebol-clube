import { Request, Response, Router } from 'express';
import ControllerLogin from '../controller/loginController';
import validate from '../controller/middlewares/validation';
import validateToken from '../controller/middlewares/validateToken';
import ControllerLoginValidate from '../controller/loginControllerValid';

const userRoute = Router();

userRoute.post('/login', validate, async (req:Request, res:Response) => {
  const { email, password } = req.body;
  const result = await ControllerLogin.getUser(email, password);
  res.status(200).json(result);
});

userRoute.get('/login/validate', validateToken, async (req:Request, res:Response) => {
  const { id } = req.body;
  const idNumber = Number(id);
  const result = await ControllerLoginValidate.getId(idNumber);
  res.status(200).json(result);
});

export default userRoute;

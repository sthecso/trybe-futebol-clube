import { Request, Response, Router } from 'express';
import ControllerLogin from '../controller/loginController';
import validate from '../controller/middlewares/validation';
import validateToken from '../controller/middlewares/validateToken';
import ControllerLoginValidate from '../controller/loginControllerValid';

const loginRoute = Router(); 
// passa validate onde possui validaçoes de email e senha do ususario para login
loginRoute.post('/login', validate, async (req:Request, res:Response) => {
  // pega email e senha do body
  const { email, password } = req.body;
  // pega getUser criado no service para se existir retorna status 200
  const result = await ControllerLogin.getUser(email, password);
  res.status(200).json(result);
});
// passa validatetoken para autentificacao
loginRoute.get('/login/validate', validateToken, async (req:Request, res:Response) => {
  // pega o id no body
  const { id } = req.body;
  // garante que o id é um numero
  const idNumber = Number(id);
  // pega o id tratado no service, se for id retorna o status 200
  const result = await ControllerLoginValidate.getId(idNumber);
  res.status(200).json(result);
});

export default loginRoute;

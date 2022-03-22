import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import LoginController from '../controllers/login.controller';
import validateToken from '../middlewares/validateToken';

const routes = Router()

routes.get('/validate', validateToken, async (req, res) => {
  const { role } = req.body.validate;
  res.status(200).send(role);
});

routes.post('/', inputValidation, async (req, res) => {
  const data = req.body
  console.log(data)
  const loginController = new LoginController
  const result = await loginController.create(data)
  if (result.code) {
    return res.status(result.code).json({ message: result.message })
  }
  res.status(200).json(result)
});

export default routes

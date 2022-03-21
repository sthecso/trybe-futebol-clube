import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import LoginController from '../controllers/login.controller';

const routes = Router()

routes.get('/validate', async (_req, res) => {
  res.json({ message: "nobruApelão" })
})

routes.post('/', inputValidation, async (req, res) => {
  const data = req.body
  console.log(data)
  const loginController = new LoginController
  const result = await loginController.create(data)
  if (result.code) {
    return res.status(result.code).json({ message: result.message })
  }
  res.status(200).json(result)
})

export default routes

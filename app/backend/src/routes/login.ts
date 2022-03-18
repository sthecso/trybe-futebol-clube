import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import LoginController from '../controllers/login.controller';

const routes = Router()

routes.get('/', async (_req, res) => {
  res.json({ message: "nobruApelão" })
})

routes.post('/', inputValidation, async (req, res) => {
  const data = req.body
  console.log(data)
  const test = new LoginController
  const jaa = await test.create(data)
  res.json(jaa)
})

export default routes

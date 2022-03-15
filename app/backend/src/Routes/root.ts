import { Router } from 'express';
import Codes from '../Enums/Codes';
import UserController from '../controllers/User';

const rootRoute = Router();

rootRoute.get('/login', async (req, res) => {
  const newUser = new UserController(req);
  const person = await newUser.getOne();
  if (!person) {
    return res.status(Codes.notFound).json({ message: 'User not found' });
  }
  res.status(Codes.OK).json(person);
});

export default rootRoute;

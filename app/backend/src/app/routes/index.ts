import { Router } from 'express';
import UserController from '../controllers/User';

const login = Router();
const userController = new UserController();

login.post('/', userController.login);

export default { login };

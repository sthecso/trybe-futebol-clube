import { Router } from 'express';
import Validate from '../middlewares/validationLogin';
import LoginController from '../controllers/loginController';

const router = Router();

router.post('/', Validate.emailAndPass, LoginController.login);

export default router;

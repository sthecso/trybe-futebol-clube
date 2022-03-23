import { Router } from 'express';
import utilsJWT from '../auth/utilsJWT';
import Validate from '../middlewares/validationLogin';
import LoginController from '../controllers/loginController';

const router = Router();

router.post('/', Validate.emailAndPass, LoginController.login);
router.get('/validate', utilsJWT.validateJwt, LoginController.validate);

export default router;

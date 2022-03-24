import { Router, Request, Response, NextFunction } from 'express';
import emailValidation from '../middlewares/emailValidation';
import passValidation from '../middlewares/passValidation';
import LoginController from '../controllers/loginController';

const loginRouter = Router();

loginRouter.post(
  '/',
  emailValidation,
  passValidation,
  async (req: Request, res: Response, _next: NextFunction) => {
    const login = req.body;

    const loggedUser = await LoginController.login(login);

    if (!loggedUser) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    res.status(200).json(loggedUser);
  },
);

export default loginRouter;

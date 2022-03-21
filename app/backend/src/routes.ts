import { Request, Response, Router } from 'express';
import { Iuser } from './utils/interfaces';
import User from './database/models/User';
import userLogin from './database/controller/loginController';
import validLogin from './database/middlewares/validLogin';
import validToken from './database/middlewares/validToken';

const router = Router();

router.get('/login/validate', validToken, async (req: Request, res: Response) => {
  const { id } = req.user;

  const { role } = await User.findByPk(id) as Iuser;
  return res.status(200).send(role);
});
router.post('/login', validLogin, userLogin);

export default router;

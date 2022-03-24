import { Request, Response, Router } from 'express';
// import { IUserRequest } from './types/interface';
import { Iuser } from './utils/interfaces';
import User from './database/models/User';
import userLogin from './controllers/loginController';
import validLogin from './middlewares/validLogin';
import validToken from './middlewares/validToken';
import { getClubController, geyClubIdController } from './controllers/clubsController';
import getMatchs from './controllers/matchsController';

const router = Router();
//
router.get('/login/validate', validToken, async (req: Request, res: Response) => {
  const { id } = req.body.user;

  const { role } = await User.findByPk(id) as Iuser;
  return res.status(200).send(role);
});
router.post('/login', validLogin, userLogin);
router.get('/clubs', getClubController);
router.get('/clubs/:id', geyClubIdController);
router.get('/matchs', getMatchs);

export default router;

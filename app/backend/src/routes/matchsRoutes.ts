import { Router } from 'express';
import validateToken from '../controllers/middlewares/validateToken';
import matchsController from '../controllers/matchsController';

const matchsRoutes = Router();

matchsRoutes.patch('/matchs/:id/finish', validateToken, matchsController.finishMatch);
matchsRoutes.patch('/matchs/:id/', validateToken, matchsController.updateMatch);
matchsRoutes.get('/matchs', matchsController.getAll);
matchsRoutes.post('/matchs', validateToken, matchsController.create);

export default matchsRoutes;

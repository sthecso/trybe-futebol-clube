import { Router } from 'express';
import matchsController from '../controllers/matchsController';

const matchsRoutes = Router();

matchsRoutes.patch('/matchs/:id/finish', matchsController.finishMatch);
matchsRoutes.get('/matchs', matchsController.getAll);
matchsRoutes.post('/matchs', matchsController.create);

export default matchsRoutes;

import { Router } from 'express';
import matchsController from '../controllers/matchsController';

const matchsRoutes = Router();

matchsRoutes.get('/matchs', matchsController.getAll);

export default matchsRoutes;

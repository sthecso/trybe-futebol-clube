import { Router } from 'express';
import * as matchsController from '../controllers/Matchs';

const matchsRoute = Router();

matchsRoute.get('/', matchsController.getAll);
matchsRoute.get('/:id', matchsController.getById);

export default matchsRoute;

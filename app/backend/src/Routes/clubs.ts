import { Router } from 'express';
import * as clubsController from '../controllers/Clubs';

const clubsRoute = Router();

clubsRoute.get('/', clubsController.getAll);
clubsRoute.get('/:id', clubsController.getById);

export default clubsRoute;

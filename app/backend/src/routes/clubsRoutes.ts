import { Router } from 'express';
import clubsController from '../controllers/clubsController';

const clubsRoutes = Router();

clubsRoutes.get('/clubs', clubsController.getAll);
clubsRoutes.get('/clubs/:id', clubsController.getById);

export default clubsRoutes;

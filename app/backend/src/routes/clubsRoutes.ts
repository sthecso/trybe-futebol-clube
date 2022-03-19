import { Router } from 'express';
import clubsController from '../controllers/clubsController';

const clubsRoutes = Router();

clubsRoutes.get('/clubs', clubsController.getAll);

export default clubsRoutes;

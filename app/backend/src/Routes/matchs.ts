import { Router } from 'express';
// import { RequestHandler } from 'express-serve-static-core';
import ValidateTeamExists from '../Middlewares/ValidateTeamExists';
import validateToken from '../Middlewares/TokenValidate';
import * as matchsController from '../controllers/Matchs';

const matchsRoute = Router();

matchsRoute.get('/', matchsController.getAll);
matchsRoute.get('/:id', matchsController.getById);
matchsRoute.post('/', validateToken, ValidateTeamExists, matchsController.insertMatch);
matchsRoute.patch('/:id/finish', validateToken, matchsController.finishMatch);

export default matchsRoute;

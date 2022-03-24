import { Router } from 'express';
import ClubsController from '../controllers/ClubsController';

const Club = Router();

Club.get('/', ClubsController.getAll);
Club.get('/:id', ClubsController.getById);

export default Club;

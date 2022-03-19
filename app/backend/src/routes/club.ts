import { Router } from 'express';
import { auth } from '../middlewares';
import { ClubController } from '../controllers';

const clubs = Router();

clubs.get(
  '/:id',
  [
    auth,
    ClubController.findById,
  ],
);

clubs.get(
  '/',
  [
    auth,
    ClubController.findAll,
  ],
);

export default clubs;

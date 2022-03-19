import { Router } from 'express';
import { ClubController } from '../controllers';

const clubs = Router();

clubs.get(
  '/:id',
  ClubController.findById,
);

clubs.get(
  '/',
  ClubController.findAll,
);

export default clubs;

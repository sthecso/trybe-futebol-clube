import { Router } from 'express';

import { ClubController, ClubControllerId } from '../controllers/ClubController';

export const Club = Router();

Club.get(
  '/',
  ClubController,
);

Club.get(
  '/:id',
  ClubControllerId,
);

export default Club;

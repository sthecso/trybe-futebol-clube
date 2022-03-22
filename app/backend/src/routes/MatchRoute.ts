import { Router } from 'express';

import MatchController from '../controllers/MatchController';

export const Match = Router();

Match.get(
  '/',
  MatchController,
);

export default Match;

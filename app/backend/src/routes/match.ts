import { Router } from 'express';
import { auth } from '../middlewares';
import { MatchController } from '../controllers';

const matches = Router();

matches.get(
  '/',
  MatchController.findAll,
);

matches.post(
  '/',
  [
    auth,
    MatchController.create,
  ],
);

export default matches;

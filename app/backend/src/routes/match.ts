import { Router } from 'express';
import { auth } from '../middlewares';
import { MatchController } from '../controllers';

const matches = Router();

matches.get(
  '/:id',
  MatchController.findAll,
);

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

matches.patch(
  '/:id/finish',
  MatchController.finish,
);

matches.patch(
  '/:id',
  MatchController.edit,
);

export default matches;

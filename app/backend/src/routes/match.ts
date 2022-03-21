import { Router } from 'express';
import { auth } from '../middlewares';
import { MatchController } from '../controllers';

const matches = Router();

matches.patch(
  '/:id/finish',
  MatchController.finish,
);

matches.patch(
  '/:id',
  MatchController.edit,
);

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

export default matches;

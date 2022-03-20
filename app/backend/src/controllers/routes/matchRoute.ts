import { Router } from 'express';

import MatchController from '../Matches';

const matchRouter = Router({ mergeParams: true });

matchRouter.get(
  '/:matchs?',
  MatchController.getById,
);

matchRouter.get(
  '/',
  MatchController.getAll,
);

export default matchRouter;

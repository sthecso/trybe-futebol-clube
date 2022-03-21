import { Router } from 'express';

import MatchController from '../Matches';

const matchRouter = Router({ mergeParams: true });

matchRouter.get(
  '/:?',
  MatchController.getMatches,
);

matchRouter.post(
  '/',
  MatchController.saveMatch,
);

matchRouter.patch(
  '/:id/finish',
  MatchController.updateFinishedMatch,
);

matchRouter.patch(
  '/:id',
  MatchController.updateInProgressMatch,
);

export default matchRouter;

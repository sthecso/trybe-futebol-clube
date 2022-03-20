import { Router } from 'express';

import clubsController from '../Clubs';

const clubRouter = Router({ mergeParams: true });

clubRouter.get(
  '/',
  clubsController.getAll,
);

clubRouter.get(
  '/:id',
  clubsController.getById,
);

export default clubRouter;

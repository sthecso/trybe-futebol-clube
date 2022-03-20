import { Router } from 'express';
import { auth, validate } from '../middlewares';
import { MatchController } from '../controllers';
import { matchSchema } from '../utils/validations';

const matches = Router();

matches.get(
  '/',
  MatchController.findAll,
);

matches.post(
  '/',
  [
    auth,
    validate(matchSchema.create),
    MatchController.create,
  ],
);

matches.patch(
  '/:id',
  [
    auth,
    validate(matchSchema.edit),
    MatchController.edit,
  ],
);

export default matches;

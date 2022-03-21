import { Router } from 'express';
import validateJwt from '../controllers/middlewares/validateJwt';
import { getAll, create, updateInProgress, updateResult } from '../controllers/matchController';
import { verifyBody, verifyExistsClubs } from '../controllers/middlewares/validateMatch';

const matchs = Router();

matchs.get('/', getAll);
matchs.post(
  '/',
  validateJwt,
  verifyExistsClubs,
  verifyBody,
  create,
);
matchs.patch('/:id', updateResult);
matchs.patch('/:id/finish', updateInProgress);

export default matchs;

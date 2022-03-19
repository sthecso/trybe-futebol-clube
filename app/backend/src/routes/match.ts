import { Router } from 'express';
import { MatchController } from '../controllers';

const matches = Router();

matches.get(
  '/',
  MatchController,
);

export default matches;

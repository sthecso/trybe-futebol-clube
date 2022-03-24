import { Router } from 'express';
import { verifyToken } from '../utils/jwt';
import matchController from '../controllers/matchController';

const Match = Router();

Match.patch('/:id/finish', verifyToken, matchController.finishMatch);
Match.patch('/:id', verifyToken, matchController.updateMatch);
Match.get('/', matchController.getAll);
Match.post('/', verifyToken, matchController.finishMatch);

export default Match;

import { Router } from 'express';
import { validateClub } from '../middlewares/validate';
import MatchService from './match.service';

class MatchController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/:inProgress?', MatchService.getMatchsByInProgress);
    // this.router.get('/', MatchService.getAllMatches);
    this.router.post('/', validateClub, MatchService.createMatch);
    this.router.patch('/:id/finish', MatchService.updateMatchProgress);
    this.router.patch('/:id', MatchService.updateMatchGoals);
  }
}

export default new MatchController();

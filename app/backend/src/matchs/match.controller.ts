import { Router } from 'express';
import MatchService from './match.service';

class MatchController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/', MatchService.getAllMatches);
    this.router.post('/', MatchService.createMatch);
    this.router.patch('/:id/finish', MatchService.updateMatch);
  }
}

export default new MatchController();

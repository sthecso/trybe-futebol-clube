import { Router } from 'express';
import MatchService from './match.service';

class MatchController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/', MatchService.getAllMatches);
  }
}

export default new MatchController();

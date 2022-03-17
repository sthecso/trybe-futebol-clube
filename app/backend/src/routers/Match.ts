import { Router } from 'express';

import { ValidateInProgress } from '../middlewares/match';

import {
  GetAllMatchesController,
} from '../controllers/match';

class Match {
  public router: Router;

  private validateInProgress = new ValidateInProgress();

  private getAllMatchesController = new GetAllMatchesController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/',
      this.validateInProgress.handle,
      this.getAllMatchesController.handle,
    );
  }
}

export default Match;

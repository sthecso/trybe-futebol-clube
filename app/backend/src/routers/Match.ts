import { Router } from 'express';

import { ValidateInProgress } from '../middlewares/match';

import {
  GetAllMatchesController,
  CreateMatchController,
} from '../controllers/match';

class Match {
  public router: Router;

  private validateInProgress = new ValidateInProgress();

  private getAllMatchesController = new GetAllMatchesController();

  private createMatchController = new CreateMatchController();

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

    this.router.post(
      '/',
      this.createMatchController.handle,
    );
  }
}

export default Match;

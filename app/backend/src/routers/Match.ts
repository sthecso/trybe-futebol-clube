import { Router } from 'express';

import {
  ValidateInProgressQueryString,
  ValidateInProgressBodyRequest,
} from '../middlewares/match';

import {
  GetAllMatchesController,
  CreateMatchController,
} from '../controllers/match';

class Match {
  public router: Router;

  private validateInProgressQueryString = new ValidateInProgressQueryString();

  private validateInProgressBodyRequest = new ValidateInProgressBodyRequest();

  private getAllMatchesController = new GetAllMatchesController();

  private createMatchController = new CreateMatchController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/',
      this.validateInProgressQueryString.handle,
      this.getAllMatchesController.handle,
    );

    this.router.post(
      '/',
      this.validateInProgressBodyRequest.handle,
      this.createMatchController.handle,
    );
  }
}

export default Match;

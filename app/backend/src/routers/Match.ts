import { Router } from 'express';

import { ValidateToken } from '../middlewares/auth';

import {
  ValidateInProgressQueryString,
  ValidateInProgressBodyRequest,
  ValidateMatchData,
} from '../middlewares/match';

import {
  GetAllMatchesController,
  CreateMatchController,
} from '../controllers/match';

class Match {
  public router: Router;

  private validateTokenMiddleware = new ValidateToken();

  private validateInProgressQueryString = new ValidateInProgressQueryString();

  private validateInProgressBodyRequest = new ValidateInProgressBodyRequest();

  private validateMatchData = new ValidateMatchData();

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
      this.validateTokenMiddleware.handle,
      this.validateInProgressBodyRequest.handle,
      this.validateMatchData.handle,
      this.createMatchController.handle,
    );
  }
}

export default Match;

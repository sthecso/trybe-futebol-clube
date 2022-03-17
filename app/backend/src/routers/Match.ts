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
  FinishMatchController,
  EditMatchByIdController,
} from '../controllers/match';

class Match {
  public router: Router;

  private validateTokenMiddleware = new ValidateToken();

  private validateInProgressQueryString = new ValidateInProgressQueryString();

  private validateInProgressBodyRequest = new ValidateInProgressBodyRequest();

  private validateMatchData = new ValidateMatchData();

  private getAllMatchesController = new GetAllMatchesController();

  private createMatchController = new CreateMatchController();

  private finishMatchController = new FinishMatchController();

  private editMatchByIdController = new EditMatchByIdController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private patchRoutes() {
    this.router.patch(
      '/:id',
      this.validateTokenMiddleware.handle,
      this.editMatchByIdController.handle,
    );

    this.router.patch(
      '/:id/finish',
      this.validateTokenMiddleware.handle,
      this.finishMatchController.handle,
    );
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

    this.patchRoutes();
  }
}

export default Match;

import { Router } from 'express';
import { MatchsController } from '../controllers';
import * as middlewares from '../middlewares';
import * as joiSchemas from '../utils/joi.schemas';

export default class Login {
  public router: Router;

  private matchsController: MatchsController;

  constructor() {
    this.matchsController = new MatchsController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.get('/', this.matchsController.findAll);

    this.router.get('/:id', this.matchsController.findById);

    this.router.post(
      '/',
      middlewares.jwtAuth,
      middlewares.validateBody(joiSchemas.newMatch),
      this.matchsController.saveMatchInProgress,
    );

    this.router.patch('/:id/finish', this.matchsController.finishMatch);

    this.router.patch('/:id', this.matchsController.updateScore);
  }
}

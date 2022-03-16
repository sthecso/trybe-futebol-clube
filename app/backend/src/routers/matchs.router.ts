import * as express from 'express';
import { MatchsController } from '../controllers';

export default class Login {
  public router: express.Router;

  private matchsController: MatchsController;

  constructor() {
    this.matchsController = new MatchsController();
    this.router = express.Router();
    this.route();
  }

  private route(): void {
    this.router.get(
      '/',
      this.matchsController.findAll,
    );
  }
}

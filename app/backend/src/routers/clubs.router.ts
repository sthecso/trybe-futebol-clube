import * as express from 'express';
import { ClubsController } from '../controllers';

export default class Login {
  public router: express.Router;

  private clubsController: ClubsController;

  constructor() {
    this.clubsController = new ClubsController();
    this.router = express.Router();
    this.route();
  }

  private route(): void {
    this.router.get(
      '/',
      this.clubsController.findAll,
    );

    this.router.get(
      '/:id',
      this.clubsController.findById,
    );
  }
}

import { Router } from 'express';
import { ClubController } from '../controllers';

class ClubRouter {
  public router: Router;

  private clubController: ClubController;

  constructor() {
    this.clubController = new ClubController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.get('/', this.clubController.getAll);
  }
}

export default ClubRouter;

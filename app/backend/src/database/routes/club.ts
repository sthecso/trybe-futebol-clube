import { Router } from 'express';
import ClubController from '../controllers/club';

class ClubRouter {
  private router: Router;

  private controllerClub = new ClubController();

  constructor() {
    this.router = Router();
    this.routePath();
  }

  routePath() {
    this.router.get('/', this.controllerClub.getAllClubs);
    this.router.get('/:id', this.controllerClub.findOneClub);
  }
}

export default ClubRouter;

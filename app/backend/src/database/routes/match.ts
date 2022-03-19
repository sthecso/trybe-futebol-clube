import { Router } from 'express';
import MatchController from '../controllers/match';

class MatchRouter {
  public router: Router;

  private matchController = new MatchController();

  constructor() {
    this.router = Router();
    this.routerPath();
  }

  routerPath() {
    this.router.get('/', this.matchController.getMatchsByProgress);
  }
}

export default MatchRouter;

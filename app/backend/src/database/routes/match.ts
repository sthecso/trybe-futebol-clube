import { Router } from 'express';
import MatchController from '../controllers/match';
import ValidateAuth from '../middlewares/validateAuth';

class MatchRouter {
  public router: Router;

  private validateAuth = new ValidateAuth();

  private matchController = new MatchController();

  constructor() {
    this.router = Router();
    this.routerPath();
  }

  routerPath() {
    this.router.get('/', this.matchController.getMatchsByProgress);
    this.router.post('/', this.validateAuth.verifyToken, this.matchController.saveMatchInProgress);
  }
}

export default MatchRouter;

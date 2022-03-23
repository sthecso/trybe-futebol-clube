import { Router } from 'express';
import { LeaderboardController } from '../controllers';

class LeaderboardRouter {
  public router: Router;

  private leaderBoardController: LeaderboardController;

  constructor() {
    this.leaderBoardController = new LeaderboardController();
    this.router = Router();
    this.route();
  }

  route() {
    this.router.get('/', this.leaderBoardController.getAll);
  }
}

export default LeaderboardRouter;

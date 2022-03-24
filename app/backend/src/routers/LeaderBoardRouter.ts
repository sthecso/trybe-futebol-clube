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
    this.router.get('/home', this.leaderBoardController.getHome);
    this.router.get('/away', this.leaderBoardController.getAway);
  }
}

export default LeaderboardRouter;

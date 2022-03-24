import { LeaderboardController } from '../controllers';
import Router from './Router';

class LeaderboardRouter extends Router {
  private boardController: LeaderboardController;

  constructor() {
    super();
    this.boardController = new LeaderboardController();
    this.route();
  }

  route() {
    this.router.get('/home', this.boardController.getAllHomeMatchs);
  }
}

export default LeaderboardRouter;

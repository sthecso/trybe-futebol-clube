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
    this.router.get('/', this.boardController.getAllMatchs);
    this.router.get('/home', this.boardController.getAllHomeMatchs);
    this.router.get('/away', this.boardController.getAllAwayMatchs);
  }
}

export default LeaderboardRouter;

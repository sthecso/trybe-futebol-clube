import * as express from 'express';
import { LeaderboardController } from '../controllers';

export default class Login {
  public router: express.Router;

  private leaderboardController: LeaderboardController;

  constructor() {
    this.leaderboardController = new LeaderboardController();
    this.router = express.Router();
    this.route();
  }

  private route(): void {
    this.router.get(
      '/home',
      this.leaderboardController.getHomeRanking,
    );
  }
}

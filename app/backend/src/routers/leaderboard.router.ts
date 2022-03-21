import { Router } from 'express';
import { LeaderboardController } from '../controllers';

export default class Login {
  public router: Router;

  private leaderboardController: LeaderboardController;

  constructor() {
    this.leaderboardController = new LeaderboardController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.get(
      '/home',
      this.leaderboardController.getHomeRanking,
    );

    this.router.get(
      '/away',
      this.leaderboardController.getAwayRanking,
    );

    this.router.get(
      '/',
      this.leaderboardController.getOverallRanking,
    );
  }
}

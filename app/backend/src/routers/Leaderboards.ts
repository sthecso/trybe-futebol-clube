import { Router } from 'express';

import {
  GetLeaderboardsHomeController,
  GetLeaderboardsAwayController,
} from '../controllers/leaderboards';

class Leaderboards {
  public router: Router;

  private getLeaderboardsHomeController = new GetLeaderboardsHomeController();

  private getLeaderboardsAwayController = new GetLeaderboardsAwayController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/home',
      this.getLeaderboardsHomeController.handle,
    );

    this.router.get(
      '/away',
      this.getLeaderboardsAwayController.handle,
    );
  }
}

export default Leaderboards;

import { Router } from 'express';

import {
  GetLeaderboardsHomeController,
  GetLeaderboardsAwayController,
  GetLeaderboardsController,
} from '../controllers/leaderboards';

class Leaderboards {
  public router: Router;

  private getLeaderboardsHomeController = new GetLeaderboardsHomeController();

  private getLeaderboardsAwayController = new GetLeaderboardsAwayController();

  private getLeaderboardsController = new GetLeaderboardsController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/',
      this.getLeaderboardsController.handle,
    );

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

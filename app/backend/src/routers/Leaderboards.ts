import { Router } from 'express';

import {
  GetLeaderboardsHomeController,
} from '../controllers/leaderboards';

class Leaderboards {
  public router: Router;

  private getLeaderboardsHomeController = new GetLeaderboardsHomeController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/home',
      this.getLeaderboardsHomeController.handle,
    );
  }
}

export default Leaderboards;

import { Router } from 'express';

import {
  GetLeaderboardsController,
} from '../controllers/leaderboards';

class Leaderboards {
  public router: Router;

  private getLeaderboardsController = new GetLeaderboardsController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/home',
      this.getLeaderboardsController.handle,
    );
  }
}

export default Leaderboards;

import { Router } from 'express';

import {
  GetAllMatchesController,
} from '../controllers/match';

class Match {
  public router: Router;

  private getAllMatchesController = new GetAllMatchesController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/',
      this.getAllMatchesController.handle,
    );
  }
}

export default Match;

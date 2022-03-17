import { Router } from 'express';

import { GetAllClubsController } from '../controllers/club';

class Club {
  public router: Router;

  private getAllClubsController = new GetAllClubsController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/',
      this.getAllClubsController.handle,
    );
  }
}

export default Club;

import { Router } from 'express';

import {
  GetAllClubsController,
  GetClubByIdController,
} from '../controllers/club';

class Club {
  public router: Router;

  private getAllClubsController = new GetAllClubsController();

  private getClubByIdController = new GetClubByIdController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.get(
      '/',
      this.getAllClubsController.handle,
    );

    this.router.get(
      '/:id',
      this.getClubByIdController.handle,
    );
  }
}

export default Club;

import { NextFunction, Request, Response, Router } from 'express';

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

  private getAllClubs() {
    this.router.get(
      '/',
      async (_req: Request, res: Response, nextMiddleware: NextFunction) => {
        try {
          const { httpStatusCode, result } = await this.getAllClubsController.handle();

          return res
            .status(httpStatusCode)
            .json(result);
        } catch (error) {
          nextMiddleware(error);
        }
      },
    );
  }

  private getClubById() {
    this.router.get(
      '/:id',
      async (req: Request, res: Response, nextMiddleware: NextFunction) => {
        try {
          const { id } = req.params;

          const { httpStatusCode, result } = await this.getClubByIdController.handle(id);

          return res
            .status(httpStatusCode)
            .json(result);
        } catch (error) {
          nextMiddleware(error);
        }
      },
    );
  }

  private start() {
    this.getAllClubs();

    this.getClubById();
  }
}

export default Club;

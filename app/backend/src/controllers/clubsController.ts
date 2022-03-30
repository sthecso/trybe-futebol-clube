import * as express from 'express';
import clubsService from '../services/clubsService';

class ClubsController {
  public path = '/clubs';

  public Service = clubsService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll);
  }

  public getAll = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const clubs = await this.Service.getAll();
      res.status(200).json(clubs);
    } catch (error) {
      next(error);
    }
  };
}

export default new ClubsController();

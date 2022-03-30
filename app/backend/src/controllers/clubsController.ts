import * as express from 'express';
import clubsService from '../services/clubsService';

class ClubsController {
  public path = '/clubs';

  public pathWithId = '/clubs/:id';

  public Service = clubsService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.get(this.pathWithId, this.getById);
  }

  public getAll = async (
    _req: express.Request,
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

  public getById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const clubById = await this.Service.getById(id);
      res.status(200).json(clubById);
    } catch (error) {
      next(error);
    }
  };
}

export default new ClubsController();

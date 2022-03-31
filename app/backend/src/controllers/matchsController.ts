import * as express from 'express';
import matchsService from '../services/matchsService';

class ClubsController {
  public path = '/matchs';

  public Service = matchsService;

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
      let matchs;
      const { inProgress } = req.query;
      if (inProgress) {
        matchs = await this.Service.getByProgress(inProgress);
      } else {
        matchs = await this.Service.getAll();
      }
      res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  };
}

export default new ClubsController();

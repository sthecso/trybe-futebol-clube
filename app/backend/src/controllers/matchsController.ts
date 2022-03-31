import * as express from 'express';
import matchsService from '../services/matchsService';

class ClubsController {
  public path = '/matchs';

  public pathWithQuery = '/matchs?inProgress=false';

  public Service = matchsService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.get(this.pathWithQuery, this.getByProgress);
  }

  public getAll = async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const matchs = await this.Service.getAll();
      res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  };

  public getByProgress = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { inProgress } = req.query;
      const query = await JSON.parse(await JSON.parse(await JSON.stringify(inProgress)));
      const match = await this.Service.getByProgress(query);
      res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  };
}

export default new ClubsController();

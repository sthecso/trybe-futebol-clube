import * as express from 'express';
import matchsService from '../services/matchsService';

class ClubsController {
  public path = '/matchs';

  public patchWithId = '/matchs/:id/finish';

  public Service = matchsService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll);
    this.router.post(this.path, this.createMatch);
    this.router.patch(this.patchWithId, this.updateInProgress);
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

  public createMatch = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: 'Token not found' });
      }
      const matchCreated = await this.Service.createMatch(req.body);
      res.status(201).json(matchCreated);
    } catch (error) {
      next(error);
    }
  };

  public updateInProgress = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const matchCreated = await this.Service.updateInProgress(id);
      res.status(200).json(matchCreated);
    } catch (error) {
      next(error);
    }
  };
}

export default new ClubsController();

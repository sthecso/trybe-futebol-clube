import * as express from 'express';
import leaderBoardService from '../services/leaderBoardService';

class LeaderBoardController {
  public path = '/leaderboard/home';

  public pathAway = '/leaderboard/away';

  public Service = leaderBoardService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllHomeMatches);
  }

  public getAllHomeMatches = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const matches = await this.Service.getAll();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default new LeaderBoardController();

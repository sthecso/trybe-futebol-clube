import * as express from 'express';
import leaderBoardService from '../services/leaderBoardService';

class LeaderBoardController {
  public pathHome = '/leaderboard/home';

  public pathAway = '/leaderboard/away';

  public Service = leaderBoardService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.pathHome, this.getAllHomeMatches);
    this.router.get(this.pathAway, this.getAllAwayMatches);
  }

  public getAllHomeMatches = async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const matches = await this.Service.getAllHomeMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  public getAllAwayMatches = async (
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const matches = await this.Service.getAllAwayMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}

export default new LeaderBoardController();

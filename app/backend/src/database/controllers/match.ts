import { Request, Response } from 'express';
import IQuery from '../interfaces/express/IQuery';
import MatchService from '../services/match';
import StatusCode from '../utils/statusCode';

class MatchController {
  private matchService = new MatchService();

  private statusCode = StatusCode;

  constructor() {
    this.getMatchsByProgress = this.getMatchsByProgress.bind(this);
  }

  async getMatchsByProgress(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as IQuery;
    const matchs = await this.matchService.getMatchsByProgress(inProgress);
    if (matchs === null) {
      return res.status(this.statusCode.NotFound)
        .json({ message: 'not found data' });
    }
    return res.status(this.statusCode.Ok).json(matchs);
  }
}

export default MatchController;

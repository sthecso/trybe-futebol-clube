import { Request, Response } from 'express';
import IQuery from '../interfaces/express/IQuery';
import IMatchReq from '../interfaces/match/IMatchReq';
import MatchService from '../services/match';
import StatusCode from '../utils/statusCode';

class MatchController {
  private matchService = new MatchService();

  private statusCode = StatusCode;

  constructor() {
    this.getMatchsByProgress = this.getMatchsByProgress.bind(this);
    this.saveMatchInProgress = this.saveMatchInProgress.bind(this);
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

  async saveMatchInProgress(req: Request, res: Response) {
    const data = req.body as unknown as IMatchReq;
    const saveProgressMatch = await this.matchService.saveMatchInProgress(data);
    return res.status(this.statusCode.Ok).json(saveProgressMatch);
  }
}

export default MatchController;

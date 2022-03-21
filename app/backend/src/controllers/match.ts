import { Request, Response } from 'express';
import IQuery from '../interfaces/express/IQuery';
import IMatchReq from '../interfaces/match/IMatchReq';
/* import IMatchReq from '../interfaces/match/IMatchReq'; */
import IUpdateGoalsReq from '../interfaces/match/IUpdateGoals';
import MatchService from '../services/match';
import StatusCode from '../utils/statusCode';

class MatchController {
  private matchService = new MatchService();

  private statusCode = StatusCode;

  constructor() {
    this.getMatchsByProgress = this.getMatchsByProgress.bind(this);
    /* this.saveMatchInProgress = this.saveMatchInProgress.bind(this); */
  }

  async getMatchsByProgress(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as IQuery;
    const matchs = await this.matchService.getMatchsByProgress(inProgress);
    return res.status(this.statusCode.Ok).json(matchs);
  }

  async saveMatchInProgress(req: Request, res: Response) {
    const datasaveMatch = req.body as unknown as IMatchReq;
    const saveMatch = await this.matchService.saveMatchInProgress(datasaveMatch);
    if (saveMatch === null) {
      return res.status(this.statusCode.Unauthorized).json({ message: 'team not found' });
    }
    return res.status(this.statusCode.Created).json(saveMatch);
  }

  async updateResultsMatch(req: Request, res: Response) {
    const data = req.body as unknown as IUpdateGoalsReq;
    const id = Number(req.params.id);
    const saveProgressMatch = await this.matchService.updateResultsMatch(id, data);
    if (saveProgressMatch === null) {
      return res.status(this.statusCode.NotFound)
        .json({ message: 'Team not found' });
    }
    return res.status(this.statusCode.Ok);
  }
}

export default MatchController;

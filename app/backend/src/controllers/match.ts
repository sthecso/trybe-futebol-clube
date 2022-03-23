import { Request, Response } from 'express';
import IQuery from '../interfaces/express/IQuery';
import IMatchReq from '../interfaces/match/IMatchReq';
/* import IMatchReq from '../interfaces/match/IMatchReq'; */
import IUpdateGoalsReq from '../interfaces/match/IUpdateGoals';
import MatchModel from '../models/match';
import StatusCode from '../utils/statusCode';

class MatchController {
  private matchmodel = new MatchModel();

  private statusCode = StatusCode;

  constructor() {
    this.getMatchsByProgress = this.getMatchsByProgress.bind(this);
    this.saveMatchInProgress = this.saveMatchInProgress.bind(this);
    this.updateResultsMatch = this.updateResultsMatch.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
  }

  async getMatchsByProgress(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as IQuery;
    let booleanQuery: boolean | undefined;

    if (inProgress && inProgress.toString() === 'false') {
      booleanQuery = false;
    }

    if (inProgress && inProgress.toString() === 'true') {
      booleanQuery = true;
    }

    const matchs = await this.matchmodel.getMatchsByProgress(booleanQuery);
    return res.status(this.statusCode.Ok).json(matchs);
  }

  async saveMatchInProgress(req: Request, res: Response) {
    const datasaveMatch = req.body as unknown as IMatchReq;
    const saveMatch = await this.matchmodel.saveMatchInProgress(datasaveMatch);
    if (saveMatch === null) {
      return res.status(this.statusCode.Unauthorized).json({ message: 'team not found' });
    }
    if (typeof saveMatch === 'string') {
      return res.status(this.statusCode.Unauthorized)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return res.status(this.statusCode.Created).json(saveMatch);
  }

  async updateResultsMatch(req: Request, res: Response) {
    const goalsMatch = req.body as unknown as IUpdateGoalsReq;
    const id = Number(req.params.id);
    const saveProgressMatch = await this.matchmodel.updateResultsMatch(id, goalsMatch);
    if (saveProgressMatch === null) {
      return res.status(this.statusCode.NotFound)
        .json({ message: 'Team not found' });
    }
    return res.status(this.statusCode.Ok).json(saveProgressMatch);
  }

  async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.matchmodel.finishMatch(id);
    return res.status(this.statusCode.Ok).json({ message: 'match was finish' });
  }
}

export default MatchController;

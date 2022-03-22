import { Request, Response } from 'express';
import { IMatchGoals } from '../interfaces';
import { MatchService } from '../services';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
    this.getMatchs = this.getMatchs.bind(this);
    this.postMatch = this.postMatch.bind(this);
    this.editMatch = this.editMatch.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
  }

  async getMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const { code, data } = await this.matchService.getInProgress((inProgress === 'true'));
      return res.status(code).json(data);
    }
    const { code, data } = await this.matchService.getAll();
    return res.status(code).json(data);
  }

  async postMatch(req: Request, res: Response) {
    const { code, data } = await this.matchService.postMatch(req.body);
    return res.status(code).json(data);
  }

  async editMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matchGoals = { id, ...req.body } as IMatchGoals;
    const { code, data } = await this.matchService.editMatch(matchGoals);
    return res.status(code).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { code, data } = await this.matchService.finishMatch(parseInt(id, 10));
    return res.status(code).json(data);
  }
}

export default MatchController;

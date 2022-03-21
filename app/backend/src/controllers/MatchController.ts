import { Request, Response } from 'express';
import { MatchService } from '../services';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
    this.getMatchs = this.getMatchs.bind(this);
  }

  async getMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === undefined) {
      const { code, data } = await this.matchService.getAll();
      return res.status(code).json(data);
    }
    const { code, data } = await this.matchService.getInProgress((inProgress === 'true'));
    return res.status(code).json(data);
  }
}

export default MatchController;

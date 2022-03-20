import { Request, Response } from 'express';
import { MatchService } from '../services';

class MatchController {
  private MatchService: MatchService;

  constructor() {
    this.MatchService = new MatchService();
  }

  getAll = async (req: Request, res: Response) => {
    const inProgress = req.query.inProgress as string | undefined;
    const matches = await this.MatchService.getAll(inProgress);
    res.status(200).json(matches);
  };
}

export default MatchController;

import { Request, Response } from 'express';
import { MatchService } from '../services';

class MatchController {
  private MatchService: MatchService;

  constructor() {
    this.MatchService = new MatchService();
  }

  getAll = async (req: Request, res: Response) => {
    const matches = await this.MatchService.getAll();
    res.status(200).json(matches);
  };
}

export default MatchController;

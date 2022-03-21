import { Request, Response } from 'express';
import { MatchService } from '../services';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const { code, data } = await this.matchService.getAll();
    return res.status(code).json(data);
  }
}

export default MatchController;

import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

class LeaderBoardController {
  private leaderBoardService: LeaderBoardService;

  constructor() {
    this.leaderBoardService = new LeaderBoardService();
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const { code, data } = await this.leaderBoardService.getAll();
    return res.status(code).json(data);
  }
}

export default LeaderBoardController;

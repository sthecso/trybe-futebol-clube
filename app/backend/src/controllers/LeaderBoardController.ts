import { Request, Response } from 'express';
import { LeaderBoardService } from '../services';

class LeaderBoardController {
  private leaderBoardService: LeaderBoardService;

  constructor() {
    this.leaderBoardService = new LeaderBoardService();
    this.getAll = this.getAll.bind(this);
    this.getHome = this.getHome.bind(this);
    this.getAway = this.getAway.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const { code, data } = await this.leaderBoardService.getAll();
    return res.status(code).json(data);
  }

  async getHome(req: Request, res: Response) {
    const { code, data } = await this.leaderBoardService.getHome();
    return res.status(code).json(data);
  }

  async getAway(req: Request, res: Response) {
    const { code, data } = await this.leaderBoardService.getAway();
    return res.status(code).json(data);
  }
}

export default LeaderBoardController;

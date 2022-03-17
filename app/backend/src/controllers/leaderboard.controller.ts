import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class ClubService {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
    this.getHomeRanking = this.getHomeRanking.bind(this);
  }

  async getHomeRanking(_req: Request, res: Response) {
    const { code, data } = await this.leaderboardService.getHomeRanking();
    return res.status(code).json(data);
  }
}

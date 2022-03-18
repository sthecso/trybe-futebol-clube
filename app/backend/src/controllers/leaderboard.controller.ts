import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class ClubService {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
    this.getHomeRanking = this.getHomeRanking.bind(this);
    this.getAwayRanking = this.getAwayRanking.bind(this);
    this.getOverallRanking = this.getOverallRanking.bind(this);
  }

  async getHomeRanking(_req: Request, res: Response) {
    const { code, data } = await this.leaderboardService.getHomeRanking();
    return res.status(code).json(data);
  }

  async getAwayRanking(_req: Request, res: Response) {
    const { code, data } = await this.leaderboardService.getAwayRanking();
    return res.status(code).json(data);
  }

  async getOverallRanking(_req: Request, res: Response) {
    const { code, data } = await this.leaderboardService.getOverallRanking();
    return res.status(code).json(data);
  }
}

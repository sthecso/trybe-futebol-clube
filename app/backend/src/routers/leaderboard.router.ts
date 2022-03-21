import { Router, Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class Login {
  public router: Router;

  private LeaderboardService: LeaderboardService;

  constructor() {
    this.LeaderboardService = new LeaderboardService();
    this.router = Router();
    this.getHomeRanking();
    this.getAwayRanking();
    this.getOverallRanking();
  }

  private getHomeRanking(): void {
    this.router.get(
      '/home',
      async (_req: Request, res: Response) => {
        const { code, data } = await this.LeaderboardService.getHomeRanking();
        return res.status(code).json(data);
      },
    );
  }

  private getAwayRanking(): void {
    this.router.get(
      '/away',
      async (_req: Request, res: Response) => {
        const { code, data } = await this.LeaderboardService.getAwayRanking();
        return res.status(code).json(data);
      },
    );
  }

  private getOverallRanking(): void {
    this.router.get(
      '/',
      async (_req: Request, res: Response) => {
        const { code, data } = await this.LeaderboardService.getOverallRanking();
        return res.status(code).json(data);
      },
    );
  }
}

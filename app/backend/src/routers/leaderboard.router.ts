import { Router, Request, Response } from 'express';
import { leaderboardFactory } from '../factories';
import { LeaderboardService } from '../services';

const leaderboardService = leaderboardFactory();

export class LeaderboardRouter {
  public router: Router;

  private LeaderboardService: LeaderboardService;

  constructor() {
    this.router = Router();
    this.getHomeRanking();
    this.getAwayRanking();
    this.getOverallRanking();
  }

  private getHomeRanking(): void {
    this.router.get(
      '/home',
      async (_req: Request, res: Response) => {
        const { code, data } = await leaderboardService.getHomeRanking();
        return res.status(code).json(data);
      },
    );
  }

  private getAwayRanking(): void {
    this.router.get(
      '/away',
      async (_req: Request, res: Response) => {
        const { code, data } = await leaderboardService.getAwayRanking();
        return res.status(code).json(data);
      },
    );
  }

  private getOverallRanking(): void {
    this.router.get(
      '/',
      async (_req: Request, res: Response) => {
        const { code, data } = await leaderboardService.getOverallRanking();
        return res.status(code).json(data);
      },
    );
  }
}

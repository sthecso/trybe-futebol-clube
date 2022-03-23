import { Request, Response, Router } from 'express';
import { LeaderboardService } from '../../service';

export default class LeaderboardRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getHomeRank();
    this.getAwayRank();
    this.getTeamCapRank();
  }

  private getHomeRank(): void {
    this.router.get('/home', async (_req: Request, res: Response) => {
      const { code, data } = await LeaderboardService.getHomeRank();
      return res.status(code).json(data);
    });
  }

  private getAwayRank(): void {
    this.router.get('/away', async (_req: Request, res: Response) => {
      const { code, data } = await LeaderboardService.getAwayRank();
      return res.status(code).json(data);
    });
  }

  private getTeamCapRank(): void {
    this.router.get('/', async (_req: Request, res: Response) => {
      const { code, data } = await LeaderboardService.getTeamCapRank();
      return res.status(code).json(data);
    });
  }
}

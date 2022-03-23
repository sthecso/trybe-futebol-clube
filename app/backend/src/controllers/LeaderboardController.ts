import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(
    readonly leaderboardService: LeaderboardService,
  ) {}

  public async getAllHome(): Promise<any[]> {
    const result = await this.leaderboardService.getAllHome();

    return result;
  }
}

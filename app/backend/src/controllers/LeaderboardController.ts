import { IClubRanking } from '../interfaces/ILeaderBoard';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(
    readonly leaderboardService: LeaderboardService,
  ) {}

  public async getAllHome(): Promise<IClubRanking[]> {
    const result = await this.leaderboardService.getAllHome();

    return result;
  }
}

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

  public async getAllAway(): Promise<IClubRanking[]> {
    const result = await this.leaderboardService.getAllAway();

    return result;
  }

  public async getAll(): Promise<IClubRanking[]> {
    const result = await this.leaderboardService.createRankingAll();

    return result;
  }
}

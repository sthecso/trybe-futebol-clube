import { LeaderboardService } from '../../service';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) {}

  async getHomeRank() {
    return this.leaderboardService.getHomeRank();
  }

  async getAwayRank() {
    return this.leaderboardService.getAwayRank();
  }

  async getTeamCapRank() {
    return this.leaderboardService.getTeamCapRank();
  }
}

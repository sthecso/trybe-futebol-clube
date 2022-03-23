import { LeaderboardService } from '../../service';

export default class LeaderboardController {
  static async getHomeRank() {
    return LeaderboardService.getHomeRank();
  }

  static async getAwayRank() {
    return LeaderboardService.getAwayRank();
  }

  static async getTeamCapRank() {
    return LeaderboardService.getTeamCapRank();
  }
}

import { LeaderboardRepository } from '../repositories';
import { IClubStats } from '../utils/interfaces';

class LeaderboardService {
  public static async findAll() {
    const leaderboard: IClubStats[] = await LeaderboardRepository
      .findAll();

    return leaderboard;
  }
}

export default LeaderboardService;

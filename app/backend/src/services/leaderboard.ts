import orderLeaderboard from '../utils/helpers/orderLeaderboard';

import {
  MatchRepository,
  ClubRepository,
  LeaderboardRepository,
} from '../repositories';

import {
  IClub,
  IClubStats,
  IMatchComplete,
} from '../utils/interfaces';

class LeaderboardService {
  public static async findAll() {
    const matches: IMatchComplete[] = await MatchRepository
      .findAll('false');

    const clubs: IClub[] = await ClubRepository
      .findAll();

    const leaderboard: IClubStats[] = LeaderboardRepository
      .getLeaderboard(clubs, matches);

    return orderLeaderboard(leaderboard);
  }
}

export default LeaderboardService;

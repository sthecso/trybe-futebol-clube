import sortArray from 'sort-array';
import { IClubHistory, IClubStats, IMatchGoals } from '../interfaces';
import { ClubsRepository } from '../repositories';

export class LeaderboardService {
  private static calcTotalPoints(matches: IMatchGoals[]) {
    return matches.reduce((totalPoints, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalPoints + 3;
      if (match.goalsFavor === match.goalsOwn) return totalPoints + 1;
      return totalPoints;
    }, 0);
  }

  private static calcTotalVictories(matches: IMatchGoals[]) {
    return matches.reduce((totalVictories, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalVictories + 1;
      return totalVictories;
    }, 0);
  }

  private static calcTotalDraws(matches: IMatchGoals[]) {
    return matches.reduce((totalDraws, match) => {
      if (match.goalsFavor === match.goalsOwn) return totalDraws + 1;
      return totalDraws;
    }, 0);
  }

  private static calcTotalLosses(matches: IMatchGoals[]) {
    return matches.reduce((totalLosses, match) => {
      if (match.goalsFavor < match.goalsOwn) return totalLosses + 1;
      return totalLosses;
    }, 0);
  }

  private static calcGoalsFavor(matches: IMatchGoals[]) {
    return matches.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private static calcGoalsOwn(matches: IMatchGoals[]) {
    return matches.reduce((goalsOwn, match) => goalsOwn + match.goalsOwn, 0);
  }

  private static sortLeaderboard(clubsStats: IClubStats[]) {
    const sortProps = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortPropsOrder = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(clubsStats, { by: sortProps, order: sortPropsOrder });
  }

  private static createLeaderboard(clubsHistory: IClubHistory[]) {
    const unsortedLeaderboard = clubsHistory.map(({ clubName, matches }) => {
      const clubStats = {
        name: clubName,
        totalPoints: this.calcTotalPoints(matches),
        totalGames: matches.length,
        totalVictories: this.calcTotalVictories(matches),
        totalDraws: this.calcTotalDraws(matches),
        totalLosses: this.calcTotalLosses(matches),
        goalsFavor: this.calcGoalsFavor(matches),
        goalsOwn: this.calcGoalsOwn(matches),
        goalsBalance: 0,
        efficiency: 0,
      };

      clubStats.goalsBalance = clubStats.goalsFavor - clubStats.goalsOwn;
      clubStats.efficiency = +(((clubStats.totalPoints / (matches.length * 3)) * 100).toFixed(2));

      return clubStats;
    });

    return this.sortLeaderboard(unsortedLeaderboard);
  }

  constructor(
    private clubsRepository: ClubsRepository,
  ) {}

  async getHomeRanking() {
    const clubsHomeHistory = await this.clubsRepository.getClubsHomeHistory();

    const homeLeaderboard = LeaderboardService.createLeaderboard(clubsHomeHistory);

    return { code: 200, data: homeLeaderboard };
  }

  async getAwayRanking() {
    const clubsAwayHistory = await this.clubsRepository.getClubsAwayHistory();

    const awayLeaderboard = LeaderboardService.createLeaderboard(clubsAwayHistory);

    return { code: 200, data: awayLeaderboard };
  }

  async getOverallRanking() {
    const clubsOverallHistory = await this.clubsRepository.getClubsOverallHistory();

    const overallLeaderboard = LeaderboardService.createLeaderboard(clubsOverallHistory);

    return { code: 200, data: overallLeaderboard };
  }
}

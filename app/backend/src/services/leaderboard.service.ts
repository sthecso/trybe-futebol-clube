import sortArray = require('sort-array');
import { IClubHistory, IClubStats, IMatchGoals } from '../interfaces';
import { ClubModel, MatchModel } from '../database/models';

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

  private clubModel: typeof ClubModel;

  private matchModel: typeof MatchModel;

  constructor() {
    this.clubModel = ClubModel;
    this.matchModel = MatchModel;
  }

  async getHomeRanking() {
    const clubsHomeHistory = (await this.clubModel.findAll({ include: [{
      model: this.matchModel,
      as: 'homeMatches',
      attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      where: { inProgress: false },
    }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matches = [...plainHistory.homeMatches];
        delete plainHistory.homeMatches;
        return plainHistory;
      }) as IClubHistory[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsHomeHistory) };
  }

  async getAwayRanking() {
    const clubsAwayHistory = (await this.clubModel.findAll({ include: [{
      model: this.matchModel,
      as: 'awayMatches',
      attributes: [['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
      where: { inProgress: false },
    }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matches = [...plainHistory.awayMatches];
        return plainHistory;
      }) as IClubHistory[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsAwayHistory) };
  }

  async getOverallRanking() {
    const clubsOverallHistory = (await this.clubModel.findAll({ include: [{
      model: this.matchModel,
      as: 'homeMatches',
      attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      where: { inProgress: false },
    }, {
      model: this.matchModel,
      as: 'awayMatches',
      attributes: [['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
      where: { inProgress: false },
    }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matches = [...plainHistory.homeMatches, ...plainHistory.awayMatches];
        return plainHistory;
      }) as IClubHistory[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsOverallHistory) };
  }
}

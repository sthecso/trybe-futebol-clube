import sortArray = require('sort-array');
import { IClubHistory, IClubStats, IMatchGoals } from '../interfaces';
import { ClubModel, MatchModel } from '../database/models';

export default class LeaderboardService {
  private static calcTotalPoints(matchs: IMatchGoals[]) {
    return matchs.reduce((totalPoints, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalPoints + 3;
      if (match.goalsFavor === match.goalsOwn) return totalPoints + 1;
      return totalPoints;
    }, 0);
  }

  private static calcTotalVictories(matchs: IMatchGoals[]) {
    return matchs.reduce((totalVictories, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalVictories + 1;
      return totalVictories;
    }, 0);
  }

  private static calcTotalDraws(matchs: IMatchGoals[]) {
    return matchs.reduce((totalDraws, match) => {
      if (match.goalsFavor === match.goalsOwn) return totalDraws + 1;
      return totalDraws;
    }, 0);
  }

  private static calcTotalLosses(matchs: IMatchGoals[]) {
    return matchs.reduce((totalLosses, match) => {
      if (match.goalsFavor < match.goalsOwn) return totalLosses + 1;
      return totalLosses;
    }, 0);
  }

  private static calcGoalsFavor(matchs: IMatchGoals[]) {
    return matchs.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private static calcGoalsOwn(matchs: IMatchGoals[]) {
    return matchs.reduce((goalsOwn, match) => goalsOwn + match.goalsOwn, 0);
  }

  private static sortLeaderboard(clubsStats: IClubStats[]) {
    const sortProps = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortPropsOrder = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(clubsStats, { by: sortProps, order: sortPropsOrder });
  }

  private static createLeaderboard(clubsHistory: IClubHistory[]) {
    const unsortedLeaderboard = clubsHistory.map(({ clubName, matchs }) => {
      const clubStats = {
        name: clubName,
        totalPoints: this.calcTotalPoints(matchs),
        totalGames: matchs.length,
        totalVictories: this.calcTotalVictories(matchs),
        totalDraws: this.calcTotalDraws(matchs),
        totalLosses: this.calcTotalLosses(matchs),
        goalsFavor: this.calcGoalsFavor(matchs),
        goalsOwn: this.calcGoalsOwn(matchs),
        goalsBalance: 0,
        efficiency: 0,
      };

      clubStats.goalsBalance = clubStats.goalsFavor - clubStats.goalsOwn;
      clubStats.efficiency = +(((clubStats.totalPoints / (matchs.length * 3)) * 100).toFixed(2));

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
      as: 'homeMatchs',
      attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      where: { inProgress: false },
    }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matchs = [...plainHistory.homeMatchs];
        delete plainHistory.homeMatchs;
        return plainHistory;
      }) as IClubHistory[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsHomeHistory) };
  }

  async getAwayRanking() {
    const clubsAwayHistory = (await this.clubModel.findAll({ include: [{
      model: this.matchModel,
      as: 'awayMatchs',
      attributes: [['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
      where: { inProgress: false },
    }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matchs = [...plainHistory.awayMatchs];
        return plainHistory;
      }) as IClubHistory[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsAwayHistory) };
  }

  async getOverallRanking() {
    const clubsOverallHistory = (await this.clubModel.findAll({ include: [{
      model: this.matchModel,
      as: 'homeMatchs',
      attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
      where: { inProgress: false },
    }, {
      model: this.matchModel,
      as: 'awayMatchs',
      attributes: [['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
      where: { inProgress: false },
    }],
    }))
      .map((clubHistory) => {
        const plainHistory = clubHistory.get({ plain: true });
        plainHistory.matchs = [...plainHistory.homeMatchs, ...plainHistory.awayMatchs];
        return plainHistory;
      }) as IClubHistory[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsOverallHistory) };
  }
}

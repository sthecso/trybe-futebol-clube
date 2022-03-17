import sortArray = require('sort-array');
import { IClubStats, ILeaderboardMatchsGoals, ISequelizeClubsHistory } from '../utils/interfaces';
import { ClubModel, MatchModel } from '../database/models';

export default class LeaderboardService {
  private static calcTotalPoints(matchs: ILeaderboardMatchsGoals[]) {
    return matchs.reduce((totalPoints, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalPoints + 3;
      if (match.goalsFavor === match.goalsOwn) return totalPoints + 1;
      return totalPoints;
    }, 0);
  }

  private static calcTotalVictories(matchs: ILeaderboardMatchsGoals[]) {
    return matchs.reduce((totalVictories, match) => {
      if (match.goalsFavor > match.goalsOwn) return totalVictories + 1;
      return totalVictories;
    }, 0);
  }

  private static calcTotalDraws(matchs: ILeaderboardMatchsGoals[]) {
    return matchs.reduce((totalDraws, match) => {
      if (match.goalsFavor === match.goalsOwn) return totalDraws + 1;
      return totalDraws;
    }, 0);
  }

  private static calcTotalLosses(matchs: ILeaderboardMatchsGoals[]) {
    return matchs.reduce((totalLosses, match) => {
      if (match.goalsFavor < match.goalsOwn) return totalLosses + 1;
      return totalLosses;
    }, 0);
  }

  private static calcGoalsFavor(matchs: ILeaderboardMatchsGoals[]) {
    return matchs.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private static calcGoalsOwn(matchs: ILeaderboardMatchsGoals[]) {
    return matchs.reduce((goalsOwn, match) => goalsOwn + match.goalsOwn, 0);
  }

  private static calcGoalsBalance(matchs: ILeaderboardMatchsGoals[]) {
    return this.calcGoalsFavor(matchs) - this.calcGoalsOwn(matchs);
  }

  private static calcEfficiency(matchs: ILeaderboardMatchsGoals[]) {
    return Number(((this.calcTotalPoints(matchs) / (matchs.length * 3)) * 100)
      .toFixed(2));
  }

  private static sortLeaderboard(clubsStats: IClubStats[]) {
    const sortProps = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortPropsOrder = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(clubsStats, { by: sortProps, order: sortPropsOrder });
  }

  private static createLeaderboard(
    clubsHistory: ISequelizeClubsHistory[],
    matchs: 'homeMatchs' | 'awayMatchs',
  ) {
    return this.sortLeaderboard(clubsHistory.map((club) => {
      const clubHistory = club.get({ plain: true }); // turn sequelize model instance in a plain object
      return {
        name: clubHistory.clubName,
        totalPoints: this.calcTotalPoints(clubHistory[matchs]),
        totalGames: clubHistory[matchs].length,
        totalVictories: this.calcTotalVictories(clubHistory[matchs]),
        totalDraws: this.calcTotalDraws(clubHistory[matchs]),
        totalLosses: this.calcTotalLosses(clubHistory[matchs]),
        goalsFavor: this.calcGoalsFavor(clubHistory[matchs]),
        goalsOwn: this.calcGoalsOwn(clubHistory[matchs]),
        goalsBalance: this.calcGoalsBalance(clubHistory[matchs]),
        efficiency: this.calcEfficiency(clubHistory[matchs]),
      };
    }));
  }

  private clubModel: typeof ClubModel;

  private matchModel: typeof MatchModel;

  constructor() {
    this.clubModel = ClubModel;
    this.matchModel = MatchModel;
  }

  async getHomeRanking() {
    const clubsHomeHistory = await this.clubModel.findAll({
      attributes: ['clubName'],
      include: [{
        model: this.matchModel,
        as: 'homeMatchs',
        attributes: ['id', ['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
        where: { inProgress: false },
      }],
    }) as unknown as ISequelizeClubsHistory[];

    return {
      code: 200,
      data: LeaderboardService.createLeaderboard(clubsHomeHistory, 'homeMatchs'),
    };
  }

  async getAwayRanking() {
    const clubsAwayHistory = await this.clubModel.findAll({
      attributes: ['clubName'],
      include: [{
        model: this.matchModel,
        as: 'awayMatchs',
        attributes: ['id', ['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
        where: { inProgress: false },
      }],
    }) as unknown as ISequelizeClubsHistory[];

    return {
      code: 200,
      data: LeaderboardService.createLeaderboard(clubsAwayHistory, 'awayMatchs'),
    };
  }
}

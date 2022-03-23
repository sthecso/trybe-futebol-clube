import sortArray = require('sort-array');
import { ClubModel, MatchModel } from '../database/models';
import { IClubCap, IClubStats, IMatchScore } from '../utils/interfaces';

export default class LeaderboardService {
  constructor(
    private clubModel: typeof ClubModel,
    private matchModel: typeof MatchModel,
  ) {}

  private static countPoints(matches: IMatchScore[]) {
    return matches.reduce((points, match) => {
      if (match.goalsFavor > match.goalsOwn) return points + 3;
      if (match.goalsFavor === match.goalsOwn) return points + 1;
      return points;
    }, 0);
  }

  private static countVictories(matches: IMatchScore[]) {
    return matches.reduce((wons, match) => {
      if (match.goalsFavor > match.goalsOwn) return wons + 1;
      return wons;
    }, 0);
  }

  private static countDraws(matches: IMatchScore[]) {
    return matches.reduce((draws, match) => {
      if (match.goalsFavor === match.goalsOwn) return draws + 1;
      return draws;
    }, 0);
  }

  private static countLosses(matches: IMatchScore[]) {
    return matches.reduce((losses, match) => {
      if (match.goalsFavor < match.goalsOwn) return losses + 1;
      return losses;
    }, 0);
  }

  private static countGoalsFavor(matches: IMatchScore[]) {
    return matches.reduce((goalsFavor, match) => goalsFavor + match.goalsFavor, 0);
  }

  private static countGoalsOwn(matches: IMatchScore[]) {
    return matches.reduce((goalsOwn, match) => goalsOwn + match.goalsOwn, 0);
  }

  private static sortScore(clubStats: IClubStats[]) {
    const sortProps = ['points', 'wons', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sortPropsOrder = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(clubStats, { by: sortProps, order: sortPropsOrder });
  }

  private static createLeaderboard(clubHistory: IClubCap[]) {
    const leaderboard = clubHistory.map(({ clubName, matches }) => {
      const clubStats = {
        name: clubName,
        points: this.countPoints(matches),
        games: matches.length,
        wons: this.countVictories(matches),
        draws: this.countDraws(matches),
        losses: this.countLosses(matches),
        goalsFavor: this.countGoalsFavor(matches),
        goalsOwn: this.countGoalsOwn(matches),
        goalsBalance: 0,
        efficiency: 0,
      };

      clubStats.goalsBalance = clubStats.goalsFavor - clubStats.goalsOwn;
      clubStats.efficiency = +(((clubStats.points / (matches.length * 3)) * 100).toFixed(2));

      return clubStats;
    });

    return this.sortScore(leaderboard);
  }

  async getHomeRank() {
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
      }) as IClubCap[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsHomeHistory) };
  }

  async getAwayRank() {
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
      }) as IClubCap[];

    return { code: 200, data: LeaderboardService.createLeaderboard(clubsAwayHistory) };
  }

  async getTeamCapRank() {
    const teamCapHistory = (await this.clubModel.findAll({ include: [{
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
      }) as IClubCap[];

    return { code: 200, data: LeaderboardService.createLeaderboard(teamCapHistory) };
  }
}

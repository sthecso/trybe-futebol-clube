import { MatchGoals, IClubRanking, IMatch } from '../interfaces/ILeaderBoard';
import Club from '../database/models/Club';
import Match from '../database/models/Match';

export default class LeaderboardService {
  private clubModel = Club;

  private matchModel = Match;

  private static calculatePoints = (matchs: MatchGoals[]): number =>
    matchs.reduce((acc, match) => {
      if (match.goalsFavor > match.goalsOwn) {
        return acc + 3;
      } if (match.goalsFavor === match.goalsOwn) {
        return acc + 1;
      }

      return acc;
    }, 0);

  private static totalVictories(matchs: MatchGoals[]): number {
    return matchs.reduce((acc, match) => {
      if (match.goalsFavor > match.goalsOwn) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  private static totalDraws(matchs: MatchGoals[]): number {
    return matchs.reduce((acc, match) => {
      if (match.goalsFavor === match.goalsOwn) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  private static totalLosses(matchs: MatchGoals[]): number {
    return matchs.reduce((acc, match) => {
      if (match.goalsFavor < match.goalsOwn) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }

  private static calculateGoalsFavor(matchs: MatchGoals[]): number {
    return matchs.reduce((acc, match) => acc + match.goalsFavor, 0);
  }

  private static calculateGoalsOwn(matchs: MatchGoals[]): number {
    return matchs.reduce((acc, match) => acc + match.goalsOwn, 0);
  }

  private static calculateBalance(matchs: MatchGoals[]): number {
    const goalsFavor = LeaderboardService.calculateGoalsFavor(matchs);
    const goalsOwn = LeaderboardService.calculateGoalsOwn(matchs);
    return goalsFavor - goalsOwn;
  }

  private static calculateEfficiency(matchs: MatchGoals[]): number {
    const totalPoints = LeaderboardService.calculatePoints(matchs);
    const efficiency = (totalPoints / (matchs.length * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }

  private static sortLeaderboard(leaderboard: IClubRanking[]): IClubRanking[] {
    return leaderboard.sort((a: IClubRanking, b: IClubRanking) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;

      return 0;
    });
  }

  private static createRanking(homeClubs: IMatch[]): IClubRanking[] {
    const leaderboard = homeClubs.map(({ clubName, matchs }) => {
      const clubAtualStatus: IClubRanking = {
        name: clubName,
        totalPoints: LeaderboardService.calculatePoints(matchs),
        totalGames: matchs.length,
        totalVictories: LeaderboardService.totalVictories(matchs),
        totalDraws: LeaderboardService.totalDraws(matchs),
        totalLosses: LeaderboardService.totalLosses(matchs),
        goalsFavor: LeaderboardService.calculateGoalsFavor(matchs),
        goalsOwn: LeaderboardService.calculateGoalsOwn(matchs),
        goalsBalance: LeaderboardService.calculateBalance(matchs),
        efficiency: LeaderboardService.calculateEfficiency(matchs),
      };

      return clubAtualStatus;
    });

    return LeaderboardService.sortLeaderboard(leaderboard);
  }

  public async getAllHome(): Promise<IClubRanking[]> {
    const homeClubs = await this.clubModel.findAll({
      include: [{
        model: this.matchModel,
        as: 'homeMatchs',
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
        where: { inProgress: false },
      }],
      nest: true,
    });

    // para gerar o array de objetos de modo que os matchs fiquem agrupado em cada home team
    // source: https://stackoverflow.com/a/32608462
    // para as próximas funções funcionar tanto em home teams quanto em away teams
    // source: https://bobbyhadz.com/blog/javascript-rename-object-key#:~:text=To%20rename%20the%20key%20of,key%20with%20the%20new%20name.&text=Copied!
    const newHomeClubs = homeClubs.map((club) => {
      const clubMatchs = club.get({ plain: true });
      const matchs = [...clubMatchs.homeMatchs];
      delete Object.assign(clubMatchs, { matchs }).homeMatchs;

      return clubMatchs;
    });

    return LeaderboardService.createRanking(newHomeClubs);
  }

  public async getAllAway(): Promise<IClubRanking[]> {
    const awayClubs = await this.clubModel.findAll({
      include: [{
        model: this.matchModel,
        as: 'awayMatchs',
        attributes: [['home_team_goals', 'goalsOwn'], ['away_team_goals', 'goalsFavor']],
        where: { inProgress: false },
      }],
      nest: true,
    });

    const newAwayClubs = awayClubs.map((club) => {
      const clubMatchs = club.get({ plain: true });
      const matchs = [...clubMatchs.awayMatchs];
      delete Object.assign(clubMatchs, { matchs }).awayMatchs;

      return clubMatchs;
    });

    return LeaderboardService.createRanking(newAwayClubs);
  }

  private async getAll() {
    return this.clubModel.findAll({
      include: [{
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
      nest: true,
    });
  }

  public async createRankingAll() {
    const allClubs = await this.getAll();

    const newAllClubs = allClubs.map((club) => {
      const clubMatchs = club.get({ plain: true });
      const matchs = [...clubMatchs.homeMatchs, ...clubMatchs.awayMatchs];
      delete Object.assign(clubMatchs, { matchs }).homeMatchs;
      delete Object.assign(clubMatchs, { matchs }).awayMatchs;

      return clubMatchs;
    });

    return LeaderboardService.createRanking(newAllClubs);
  }
}

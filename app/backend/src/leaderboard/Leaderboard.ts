import Club from '../database/models/Club';
import { ClubModel, MatchModel } from '../database/models';
import Team from './Team';

class Leaderboard {
  private clubModel: typeof ClubModel;

  private matchModel: typeof MatchModel;

  private leaderBoard: Team[];

  private ordered: boolean;

  constructor() {
    this.clubModel = ClubModel;
    this.matchModel = MatchModel;
    this.leaderBoard = [];
  }

  async getBoard(filter = 'all') {
    this.leaderBoard = [];
    const orderedBoard = await this.orderBoard(filter);
    return orderedBoard;
  }

  async orderBoard(filter: string): Promise<Team[]> {
    let afterMatchesLeaderBoard;
    switch (filter) {
      case 'home': afterMatchesLeaderBoard = await this.calculateHomeMatchs();
        break;
      case 'away': afterMatchesLeaderBoard = await this.calculateAwayMatchs();
        break;
      default: afterMatchesLeaderBoard = await this.calculateAllMatchs();
    }
    const ordered = afterMatchesLeaderBoard.sort((a: Team, b: Team) => {
      const diffPoints = b.totalPoints - a.totalPoints;
      if (diffPoints === 0) {
        return this.tieBreaker(a, b);
      }
      return diffPoints;
    });
    return ordered;
  }

  tieBreaker(a: Team, b: Team): number {
    this.ordered = true;
    const diffVictories = b.totalVictories - a.totalVictories;
    if (diffVictories === 0) {
      const diffGoalsBalance = b.goalsBalance - a.goalsBalance;
      if (diffGoalsBalance === 0) {
        const diffGoalsFavor = b.goalsFavor - a.goalsFavor;
        if (diffGoalsFavor === 0) {
          return b.goalsOwn - a.goalsOwn;
        }
        return diffGoalsFavor;
      }
      return diffGoalsBalance;
    }
    return diffVictories;
  }

  async calculateAllMatchs(): Promise<Team[]> {
    const matchs = await this.matchModel.findAll({ where: { inProgress: false } });
    const promises = matchs.map(async (match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
      const { clubName: homeTeamName } = await this.clubModel.findByPk(homeTeam) as Club;
      const { clubName: awayTeamName } = await this.clubModel.findByPk(awayTeam) as Club;
      const homeTeamObj = this.getTeamIndexByName(homeTeamName);
      const awayTeamObj = this.getTeamIndexByName(awayTeamName);
      this.resultMatch(homeTeamObj, awayTeamObj, homeTeamGoals, awayTeamGoals);
    });
    const promisedAll = await Promise.all(promises);
    if (promisedAll) {
      return this.leaderBoard;
    }
    return this.leaderBoard;
  }

  async calculateHomeMatchs(): Promise<Team[]> {
    const matchs = await this.matchModel.findAll({ where: { inProgress: false } });
    const promises = matchs.map(async (match) => {
      const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
      const { clubName: homeTeamName } = await this.clubModel.findByPk(homeTeam) as Club;
      const homeTeamObj = this.getTeamIndexByName(homeTeamName);
      this.resultMatchHome(homeTeamObj, homeTeamGoals, awayTeamGoals);
    });
    const promisedAll = await Promise.all(promises);
    if (promisedAll) {
      return this.leaderBoard;
    }
    return this.leaderBoard;
  }

  async calculateAwayMatchs(): Promise<Team[]> {
    const matchs = await this.matchModel.findAll({ where: { inProgress: false } });
    const promises = matchs.map(async (match) => {
      const { awayTeam, homeTeamGoals, awayTeamGoals } = match;
      const { clubName: awayTeamName } = await this.clubModel.findByPk(awayTeam) as Club;
      const awayTeamObj = this.getTeamIndexByName(awayTeamName);
      this.resultMatchAway(awayTeamObj, homeTeamGoals, awayTeamGoals);
    });
    const promisedAll = await Promise.all(promises);
    if (promisedAll) {
      return this.leaderBoard;
    }
    return this.leaderBoard;
  }

  resultMatch(homeTeam: Team, awayTeam: Team, homeTeamGoals: number, awayTeamGoals: number) {
    if (homeTeamGoals > awayTeamGoals) {
      homeTeam.win(homeTeamGoals, awayTeamGoals);
      awayTeam.lose(awayTeamGoals, homeTeamGoals);
    } else if (homeTeamGoals === awayTeamGoals) {
      homeTeam.draw(homeTeamGoals, awayTeamGoals);
      awayTeam.draw(awayTeamGoals, homeTeamGoals);
    } else {
      homeTeam.lose(homeTeamGoals, awayTeamGoals);
      awayTeam.win(awayTeamGoals, homeTeamGoals);
    }
    this.ordered = false;
  }

  resultMatchHome(homeTeam: Team, homeTeamGoals: number, awayTeamGoals: number) {
    if (homeTeamGoals > awayTeamGoals) {
      homeTeam.win(homeTeamGoals, awayTeamGoals);
    } else if (homeTeamGoals === awayTeamGoals) {
      homeTeam.draw(homeTeamGoals, awayTeamGoals);
    } else {
      homeTeam.lose(homeTeamGoals, awayTeamGoals);
    }
    this.ordered = false;
  }

  resultMatchAway(awayTeam: Team, homeTeamGoals: number, awayTeamGoals: number) {
    if (homeTeamGoals > awayTeamGoals) {
      awayTeam.win(homeTeamGoals, awayTeamGoals);
    } else if (homeTeamGoals === awayTeamGoals) {
      awayTeam.draw(homeTeamGoals, awayTeamGoals);
    } else {
      awayTeam.lose(homeTeamGoals, awayTeamGoals);
    }
    this.ordered = false;
  }

  getTeamIndexByName(clubName: string): Team {
    const teamFound = this.leaderBoard.find((team) => team.name === clubName);
    if (!teamFound) {
      return this.insertTeamToLeaderBoard(clubName);
    }
    return teamFound;
  }

  insertTeamToLeaderBoard(clubName: string): Team {
    const newTeam = new Team(clubName);
    console.log(newTeam);
    this.leaderBoard.push(newTeam);
    return newTeam;
  }
}

export default Leaderboard;

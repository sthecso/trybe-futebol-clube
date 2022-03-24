import Club from '../database/models/Club';
import { ClubModel, MatchModel } from '../database/models';
import Team from './Team';
import Match from '../database/models/Match';

class Leaderboard {
  private clubModel: typeof ClubModel;

  private matchModel: typeof MatchModel;

  private leaderBoardOverAll: Team[];

  private leaderBoardHome: Team[];

  private leaderBoardAway: Team[];

  private matchs: Match[];

  private ordered: boolean;

  constructor() {
    this.clubModel = ClubModel;
    this.matchModel = MatchModel;
    this.leaderBoardOverAll = [];
    this.leaderBoardHome = [];
    this.leaderBoardAway = [];
  }

  async getBoard(filter = 'all') {
    this.leaderBoardOverAll = [];
    let unorderedBoard;
    switch (filter) {
      case 'home': unorderedBoard = await this.calculateHomeMatchs();
        break;
      case 'away': unorderedBoard = await this.calculateAwayMatchs();
        break;
      default: unorderedBoard = await this.calculateAllMatchs();
    }
    const orderedBoard = await this.orderBoard(unorderedBoard);
    return orderedBoard;
  }

  async orderBoard(unorderedBoard: Team[]): Promise<Team[]> {
    const ordered = unorderedBoard.sort((a: Team, b: Team) => {
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
      return this.leaderBoardOverAll;
    }
    return this.leaderBoardOverAll;
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
      return this.leaderBoardOverAll;
    }
    return this.leaderBoardOverAll;
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
      return this.leaderBoardOverAll;
    }
    return this.leaderBoardOverAll;
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
    if (awayTeamGoals > homeTeamGoals) {
      awayTeam.win(awayTeamGoals, homeTeamGoals);
    } else if (homeTeamGoals === awayTeamGoals) {
      awayTeam.draw(awayTeamGoals, homeTeamGoals);
    } else {
      awayTeam.lose(awayTeamGoals, homeTeamGoals);
    }
    this.ordered = false;
  }

  getTeamIndexByName(clubName: string): Team {
    const teamFound = this.leaderBoardOverAll.find((team) => team.name === clubName);
    if (!teamFound) {
      return this.insertTeamToLeaderBoard(clubName);
    }
    return teamFound;
  }

  insertTeamToLeaderBoard(clubName: string): Team {
    const newTeam = new Team(clubName);
    this.leaderBoardOverAll.push(newTeam);
    return newTeam;
  }
}

export default Leaderboard;

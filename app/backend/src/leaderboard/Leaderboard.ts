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

  async getAll() {
    const orderedBoard = await this.orderBoard();
    return orderedBoard;
  }

  async orderBoard(): Promise<Team[]> {
    const afterMatchesLeaderBoard = await this.calculateMatchs();
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

  async calculateMatchs(): Promise<Team[]> {
    const matchs = await this.matchModel.findAll();
    const promises = matchs.map(async (match) => {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
      const { clubName: homeTeamName } = await this.clubModel.findByPk(homeTeam) as Club;
      const { clubName: awayTeamName } = await this.clubModel.findByPk(awayTeam) as Club;
      const homeTeamObj = this.leaderBoard[this.getTeamIndexByName(homeTeamName)];
      const awayTeamObj = this.leaderBoard[this.getTeamIndexByName(awayTeamName)];
      this.resultMatch(homeTeamObj, awayTeamObj, homeTeamGoals, awayTeamGoals);
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
    this.updateLeaderBoard(homeTeam, awayTeam);
  }

  updateLeaderBoard(homeTeam: Team, awayTeam: Team) {
    this.leaderBoard[homeTeam.id] = homeTeam;
    this.leaderBoard[awayTeam.id] = awayTeam;
  }

  getTeamIndexByName(clubName: string): number {
    const teamFoundIndex = this.leaderBoard.findIndex((team) => team.name === clubName);
    if (teamFoundIndex === -1) {
      return this.insertTeamToLeaderBoard(clubName);
    }
    return teamFoundIndex;
  }

  insertTeamToLeaderBoard(clubName: string): number {
    const newTeam = new Team(this.leaderBoard.length, clubName);
    this.leaderBoard.push(newTeam);
    return newTeam.id;
  }
}

export default Leaderboard;

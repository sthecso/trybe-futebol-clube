import { IMatchWithId } from '../interfaces/IMatchs';

class Board {
  public clubName:string;

  public totalPoints:number;

  public totalGames:number;

  public totalVictories: number;

  public totalDraws: number;

  public totalLosses: number;

  public goalsFavor: number;

  public goalsOwn: number;

  public goalsBalance: number;

  public efficiency: number;

  public structure() {
    const board = {
      name: this.clubName,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
    return board;
  }

  private getClubName(clubName: string) {
    this.clubName = clubName;
    return this.clubName;
  }

  private getTotalPoints(match: IMatchWithId) {
    this.goalsFavor += match.homeTeamGoals;
    this.goalsOwn += match.awayTeamGoals;

    if (match.homeTeamGoals > match.awayTeamGoals) {
      this.totalPoints += 3;
      this.totalVictories += 1;
    }

    if (match.homeTeamGoals === match.awayTeamGoals) {
      this.totalPoints += 1;
      this.totalDraws += 1;
      console.log(this.totalPoints);
    }

    if (match.homeTeamGoals < match.awayTeamGoals) {
      this.totalLosses += 1;
    }
  }

  private getTotalGames(homeClub: IMatchWithId[]) {
    this.totalGames += homeClub.length;
    return this.totalGames;
  }

  private getEfficiency() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = parseFloat(
      ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2),
    );
  }

  public boardMatches(clubName: string, homeClub: IMatchWithId[]) {
    homeClub.map((m) => this.getTotalPoints(m));
    this.getClubName(clubName);
    this.getTotalGames(homeClub);
    this.getEfficiency();
    return this.structure;
  }
}

export default new Board();

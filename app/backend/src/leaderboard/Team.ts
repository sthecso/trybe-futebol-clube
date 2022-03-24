import { ILeaderBoardTeam } from '../interfaces';

class Team implements ILeaderBoardTeam {
  name = '';

  totalPoints = 0;

  totalGames = 0;

  totalVictories = 0;

  totalDraws = 0;

  totalLosses = 0;

  goalsFavor = 0;

  goalsOwn = 0;

  goalsBalance = 0;

  efficiency = 0;

  constructor(n: string) {
    this.name = n;
  }

  win(goalsScored: number, goalsTaken: number) {
    this.totalGames += 1;
    this.totalVictories += 1;
    this.totalPoints += 3;
    this.goalsFavor += goalsScored;
    this.goalsOwn += goalsTaken;
    this.attBalanceAndEfficiency();
  }

  draw(goalsScored: number, goalsTaken: number) {
    this.totalGames += 1;
    this.totalDraws += 1;
    this.totalPoints += 1;
    this.goalsFavor += goalsScored;
    this.goalsOwn += goalsTaken;
    this.attBalanceAndEfficiency();
  }

  lose(goalsScored: number, goalsTaken: number) {
    this.totalGames += 1;
    this.totalLosses += 1;
    this.goalsFavor += goalsScored;
    this.goalsOwn += goalsTaken;
    this.attBalanceAndEfficiency();
  }

  attBalanceAndEfficiency() {
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }
}

export default Team;

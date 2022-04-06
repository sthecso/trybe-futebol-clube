import { IMatchWithId } from '../interfaces/IMatchs';

class AwayBoard {
  private static _totalPoints: number;

  private static _goalsFavor: number;

  private static _goalsOwn: number;

  private static _efficiency: number;

  public static receiveAwayClub(clubName: string, matches: IMatchWithId[]) {
    const structure = {
      name: clubName,
      totalPoints: AwayBoard.getTotalPoints(matches),
      totalGames: matches.length,
      totalVictories: AwayBoard.getTotalVictories(matches),
      totalDraws: AwayBoard.getTotalDraws(matches),
      totalLosses: AwayBoard.getTotalLosses(matches),
      goalsFavor: AwayBoard.getTotalFavor(matches),
      goalsOwn: AwayBoard.getTotalGoalsOwn(matches),
      goalsBalance: this.getTotalGoalsBalance(),
      efficiency: AwayBoard.getEfficiency(matches),
    };
    return structure;
  }

  private static getTotalPoints(matches: IMatchWithId[]) {
    const sumPoints = matches.reduce((acc, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 3;
      if (curr.awayTeamGoals === curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
    this._totalPoints = sumPoints;
    return sumPoints;
  }

  private static getTotalVictories(matches: IMatchWithId[]) {
    const totalVictories = matches.reduce((acc, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return totalVictories;
  }

  private static getTotalDraws(matches: IMatchWithId[]) {
    const totalDraws = matches.reduce((acc, curr) => {
      if (curr.awayTeamGoals === curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return totalDraws;
  }

  private static getTotalLosses(matches: IMatchWithId[]) {
    const totalLosses = matches.reduce((acc, curr) => {
      if (curr.awayTeamGoals < curr.homeTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return totalLosses;
  }

  private static getTotalFavor(matches: IMatchWithId[]) {
    const totalGoalsFavor = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    this._goalsFavor = totalGoalsFavor;
    return totalGoalsFavor;
  }

  private static getTotalGoalsOwn(matches: IMatchWithId[]) {
    const totalGoalsOwn = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    this._goalsOwn = totalGoalsOwn;
    return totalGoalsOwn;
  }

  private static getTotalGoalsBalance() {
    return this._goalsFavor - this._goalsOwn;
  }

  private static getEfficiency(matches: IMatchWithId[]) {
    const calculateEfficiency = parseFloat(
      ((this._totalPoints / (matches.length * 3)) * 100).toFixed(2),
    );
    this._efficiency = calculateEfficiency;
    return this._efficiency;
  }
}

export default AwayBoard;

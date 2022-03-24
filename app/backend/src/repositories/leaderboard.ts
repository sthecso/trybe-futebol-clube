import {
  IClub,
  IClubStats,
  IMatchComplete,
} from '../utils/interfaces';

class LeaderboardRepository {
  leaderboard: IClubStats[];

  static totalGames: number;

  static totalPoints: number;

  static goalsFavor: number;

  static goalsOwn: number;

  static getTotalMatches(
    clubId: IClub['id'],
    allMatches: IMatchComplete[],
  ): number {
    const totalMatches = allMatches.filter(({ homeTeam }) => (
      clubId === homeTeam
    )).length;

    this.totalGames = totalMatches;

    return totalMatches;
  }

  static getTotalTies(
    clubId: IClub['id'],
    allMatches: IMatchComplete[],
  ): number {
    const totalTies = allMatches.filter(({
      homeTeam,
      homeTeamGoals,
      awayTeamGoals,
    }) => (
      (clubId === homeTeam)
      && homeTeamGoals === awayTeamGoals
    )).length;

    return totalTies;
  }

  static getTotalWins(
    clubId: IClub['id'],
    allMatches: IMatchComplete[],
  ): number {
    const totalWins = allMatches.filter(({
      homeTeam,
      homeTeamGoals,
      awayTeamGoals,
    }) => (
      (clubId === homeTeam && homeTeamGoals > awayTeamGoals)
    )).length;

    return totalWins;
  }

  static getTotalLosses(
    clubId: IClub['id'],
    allMatches: IMatchComplete[],
  ): number {
    const totalLosses = allMatches.filter(({
      homeTeam,
      homeTeamGoals,
      awayTeamGoals,
    }) => (
      (clubId === homeTeam && homeTeamGoals < awayTeamGoals)
    )).length;

    return totalLosses;
  }

  static getScore(
    clubId: IClub['id'],
    allMatches: IMatchComplete[],
  ): number {
    const ties = this.getTotalTies(clubId, allMatches);
    const wins = this.getTotalWins(clubId, allMatches);

    const score: number = ties + (wins * 3);

    this.totalPoints = score;

    return score;
  }

  static getGoalsScored(
    clubId: IClub['id'],
    allMatches: IMatchComplete[],
  ) {
    let goalsScored = 0;

    allMatches.forEach(({
      homeTeam,
      homeTeamGoals,
    }) => {
      if (clubId === homeTeam) goalsScored += homeTeamGoals;
    });

    this.goalsFavor = goalsScored;

    return goalsScored;
  }

  static getGoalsReceived(
    clubId: IClub['id'],
    allMatches: IMatchComplete[],
  ) {
    let goalsReceived = 0;

    allMatches.forEach(({
      homeTeam,
      awayTeamGoals,
    }) => {
      if (clubId === homeTeam) goalsReceived += awayTeamGoals;
    });

    this.goalsOwn = goalsReceived;

    return goalsReceived;
  }

  // P/(J*3)*100
  static calculateYield() {
    const result = (
      (this.totalPoints / (this.totalGames * 3)) * 100
    ).toFixed(2);

    const efficiency = Number(result);

    return efficiency;
  }

  public static getLeaderboard = (
    clubs: IClub[],
    allMatches: IMatchComplete[],
  ): IClubStats[] => {
    const leaderboard: IClubStats[] = [];

    clubs.forEach(({ id, clubName }) => leaderboard.push({
      name: clubName,
      totalPoints: this.getScore(id, allMatches),
      totalGames: this.getTotalMatches(id, allMatches),
      totalVictories: this.getTotalWins(id, allMatches),
      totalDraws: this.getTotalTies(id, allMatches),
      totalLosses: this.getTotalLosses(id, allMatches),
      goalsFavor: this.getGoalsScored(id, allMatches),
      goalsOwn: this.getGoalsReceived(id, allMatches),
      goalsBalance: this.goalsFavor - this.goalsOwn,
      efficiency: this.calculateYield(),
    }));

    return leaderboard;
  };
}

export default LeaderboardRepository;

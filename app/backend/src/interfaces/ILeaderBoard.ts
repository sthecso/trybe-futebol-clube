export interface MatchGoals {
  goalsFavor: number;
  goalsOwn: number;
}

export interface IMatch {
  clubName: string;
  matchs: MatchGoals[];
}

export interface IClubRanking {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

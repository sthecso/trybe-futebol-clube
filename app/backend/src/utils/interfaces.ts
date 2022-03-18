export interface ICredentials {
  email: string;
  password: string;
}

export interface ITokenData {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface INewMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: true;
}

export interface IScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface ILeaderboardMatchGoals {
  goalsFavor: number;
  goalsOwn: number
}

export interface IClubHistory {
  clubName: string;
  matchs: ILeaderboardMatchGoals[];
}

export interface IClubStats {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

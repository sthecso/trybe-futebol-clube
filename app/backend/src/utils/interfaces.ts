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

export interface ILeaderboardMatchsGoals {
  id: number;
  goalsFavor: number;
  goalsOwn: number
}

export interface ISequelizeClubsHistory {
  get(param: { plain: true }): IClubsHistory;
}

export interface IClubsHistory {
  clubName: string;
  homeMatchs: ILeaderboardMatchsGoals[];
  awayMatchs: ILeaderboardMatchsGoals[];
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

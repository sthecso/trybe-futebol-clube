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

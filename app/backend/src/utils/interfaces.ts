export interface IUserLogin {
  email: string;
  password: string;
}

export interface IErrorStatus {
  [key: string]: number;
}

export interface IJwtPayload {
  role: string;
  iat?: number;
}

export interface IClub {
  id: number;
  name: string;
}

export interface IClubName {
  clubname: string;
}

export interface IMatch {
  id?: number;
  homeTeam: string;
  homeTeamGoals: number;
  awayTeam: string;
  awayTeamGoals: number;
  inProgress: boolean;
  homeClub: IClubName;
  awayClub: IClubName;
}

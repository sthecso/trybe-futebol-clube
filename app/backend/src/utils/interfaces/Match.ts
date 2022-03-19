export interface IMatchSimple {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatch extends IMatchSimple {
  id: number;
}

export interface IMatchComplete extends IMatch {
  homeClub: {
    clubName: string;
  };
  awayClub: {
    clubName: string;
  };
}

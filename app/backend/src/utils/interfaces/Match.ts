export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchSimple extends ITeamGoals {
  homeTeam: number;
  awayTeam: number;
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

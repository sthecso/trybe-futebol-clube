export interface IMatchScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchCreate extends IMatchScore {
  homeTeam: number;
  awayTeam: number;
  inProgress?: boolean;
}

export interface IMatch {
  id: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}

export interface IMatchComplete extends IMatch {
  homeClub: {
    clubName: string;
  };
  awayClub: {
    clubName: string;
  };
}

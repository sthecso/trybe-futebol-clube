export interface IMatch {
  id: number;
  homeTeam: string;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
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

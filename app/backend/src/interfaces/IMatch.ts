export interface IMatch {
  id?: number;
  homeTeam: string;
  homeTeamGoals: number;
  awayTeam: string;
  awayTeamGoals: number;
  inProgress?: boolean;
  homeClub: {
    clubName: string;
  };
  awayClub: {
    clubName: string;
  };
}

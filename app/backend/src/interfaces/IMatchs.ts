export default interface IMatchs {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  inProgress: boolean;
  homeClub: {
    clubName: string;
  }
  awayClub: {
    clubName: string;
  }
}

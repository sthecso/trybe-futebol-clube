interface HomeClub {
  clubName: string;
}

interface IMatchRes {

  id: number;
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: true,
  homeClub: HomeClub,
  awayClub: HomeClub,

}

export default IMatchRes;

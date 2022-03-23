interface ITeams {
  clubName: string
}

export default interface IMatch {
  id: number
  homeTeam: number
  awayTeam: number
  awayTeamGoals: number
  inProgress: boolean
  homeClub: ITeams
  awayClub: ITeams
}

export interface IMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IMatchGoals {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

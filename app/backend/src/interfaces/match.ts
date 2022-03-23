export interface IMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
}

export interface IMatchGoals {
  id: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

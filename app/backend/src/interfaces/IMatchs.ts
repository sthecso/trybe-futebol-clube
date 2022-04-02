export interface IMatch {
  homeTeam: number
  awayTeam: number
  homeTeamGoals: number
  awayTeamGoals: number
  inProgress: boolean,
}

export interface IMatchWithId extends IMatch {
  id: number
}

export interface IMatchesTeam {
  id: number,
  clubName: string,
  homeClub: IMatchWithId[]
}

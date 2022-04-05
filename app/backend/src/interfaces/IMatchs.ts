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

interface IMatches {
  id: number,
  clubName: string,
}

export interface IMatchesHomeTeam extends IMatches {
  homeClub: IMatchWithId[]
}

export interface IMatchesAwayTeam extends IMatches {
  awayClub: IMatchWithId[]
}

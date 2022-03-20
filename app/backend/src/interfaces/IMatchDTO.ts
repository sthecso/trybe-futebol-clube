export type Indexable = {
  id?: number
};

export interface IMatchDTO extends Indexable {
  inProgress: boolean
  homeClub: {
    clubName: string
  }
  awayClub: {
    clubName: string
  }
}

export type Score = {
  homeTeamGoals: number
  awayTeamGoals: number
};

export interface IMatch extends Indexable, Score {
  awayTeam: Indexable
  homeTeam: Indexable
  inProgress: boolean
}

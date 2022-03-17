export type Indexable = {
  id?: number
};

export type HomeTeam = Indexable & {
  homeTeam: Indexable
  homeTeamGoals: number
};

export type AwayTeam = Indexable & {
  awayTeam: Indexable
  awayTeamGoals: number
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

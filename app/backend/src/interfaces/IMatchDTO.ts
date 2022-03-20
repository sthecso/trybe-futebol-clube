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

export interface IMatch extends Indexable {
  awayTeam: Indexable
  awayTeamGoals: number
  homeTeam: Indexable
  homeTeamGoals: number
  inProgress: boolean
}

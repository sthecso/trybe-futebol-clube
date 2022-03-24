interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

interface ICreatedMatch extends IMatch {
  id: number;
}

interface UpdateMatch {
  homeTeam?: number;
  homeTeamGoals?: number;
  awayTeam?: number;
  awayTeamGoals?: number;
  inProgress?: boolean;
}

interface IMatchWithClubs extends ICreatedMatch {
  homeClub: {
    clubName: string;
  },
  awayClub: {
    clubName: string;
  }
}

export {
  IMatch,
  ICreatedMatch,
  IMatchWithClubs,
  UpdateMatch,
};

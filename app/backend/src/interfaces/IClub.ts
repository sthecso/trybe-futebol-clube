interface IClub {
  id: number;
  clubName: string;
}

interface IMatchGoals {
  dataValues: {
    goalsFavor: number;
    goalsOwn: number;
  }
}

interface IClubWithHomeMatches extends IClub {
  homeMatchs: IMatchGoals[]
}

interface IClubWithAwayMatches extends IClub {
  awayMatchs: IMatchGoals[]
}

export {
  IClub,
  IClubWithHomeMatches,
  IClubWithAwayMatches,
  IMatchGoals,
};

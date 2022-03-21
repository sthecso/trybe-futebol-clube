const firstMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeClub: {
    clubName: 'São Paulo',
  },
  awayClub: {
    clubName: 'Grêmio',
  }
};

const validNewMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 3,
  inProgress: true,
};

const sameTeam = {
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 3,
  inProgress: true,
};

const inexistentTeam = {
  homeTeam: 888,
  awayTeam: 1,
  homeTeamGoals: 2,
  awayTeamGoals: 3,
  inProgress: true,
};

const newScore = {
  homeTeamGoals: 4,
  awayTeamGoals: 5,
};

export {
  firstMatch,
  validNewMatch,
  sameTeam,
  inexistentTeam,
  newScore,
};

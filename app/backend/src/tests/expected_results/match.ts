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
  },
};

const newMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 3,
  inProgress: true,
};

const createNewMatchResponse = {
  id: 49,
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 3,
  inProgress: true,
};

const getNewMatchResponse = {
  id: 49,
  homeTeam: 16,
  homeTeamGoals: 2,
  awayTeam: 8,
  awayTeamGoals: 3,
  inProgress: true,
  homeClub: {
    clubName: 'São Paulo',
  },
  awayClub: {
    clubName: 'Grêmio',
  },
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
  newMatch,
  createNewMatchResponse,
  getNewMatchResponse,
  sameTeam,
  inexistentTeam,
  newScore,
};

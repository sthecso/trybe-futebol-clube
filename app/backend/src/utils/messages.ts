export const request = {
  login: {
    invalid: 'Username or password invalid',
  },
  token: {
    notFound: 'Token not found',
    invalid: 'Invalid token',
  },
};

export const user = {
  required: 'All fields must be filled',
  incorrect: 'Incorrect email or password',
  email: {
    base: 'Email must be a string',
  },
  password: {
    base: 'Password must be a string',
  },
};

export const match = {
  notFound: 'Match not found',
  required: 'All fields must be filled',
  teams: {
    conflict: 'It is not possible to create a match with two equal teams',
    notFound: 'Team not found',
  },
  homeTeam: {
    base: 'homeTeam must be a number',
  },
  homeTeamGoals: {
    base: 'homeTeamGoals must be a number',
  },
  awayTeam: {
    base: 'awayTeam must be a number',
  },
  awayTeamGoals: {
    base: 'awayTeamGoals must be a number',
  },
  inProgress: {
    base: 'inProgress must be a boolean',
  },
};

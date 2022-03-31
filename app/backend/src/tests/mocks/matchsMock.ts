const Matchs = require('./Matchs.json');


const MatchsMock = {
  findAll: async () => Matchs,
};

export {
  MatchsMock,
};
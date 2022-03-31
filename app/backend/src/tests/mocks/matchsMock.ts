const Matchs = require('./json/Matchs.json');
const MatchsInProgressFalse = require('./json/MatchsInProgressFalse.json');
const MatchsInProgressTrue = require('./json/MatchsInProgressTrue.json');


const MatchsMock = {
  findAll: async () => Matchs,
  findByProgressFalse: async () => MatchsInProgressFalse,
  findByProgressTrue: async () => MatchsInProgressTrue,
};

export {
  MatchsMock,
};
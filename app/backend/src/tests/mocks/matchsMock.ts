const Matchs = require('./json/Matchs.json');
const MatchCreate = require('./json/MatchCreated.json');
const MatchsInProgressFalse = require('./json/MatchsInProgressFalse.json');
const MatchsInProgressTrue = require('./json/MatchsInProgressTrue.json');


const MatchsMock = {
  findAll: async () => Matchs,
  findByProgressFalse: async () => MatchsInProgressFalse,
  findByProgressTrue: async () => MatchsInProgressTrue,
  create: async () => MatchCreate,
};

export {
  MatchsMock,
};
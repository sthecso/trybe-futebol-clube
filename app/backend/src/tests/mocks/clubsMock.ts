const Clubs = require('./Clubs.json');

const ClubsMock = {
  findAll: async () => Clubs,
};

export {
  ClubsMock,
};
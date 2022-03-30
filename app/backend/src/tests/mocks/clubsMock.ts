const Clubs = require('./Clubs.json');


const ClubsMock = {
  findAll: async () => Clubs,
  findByPk: async () => Clubs[0],
};

export {
  ClubsMock,
};
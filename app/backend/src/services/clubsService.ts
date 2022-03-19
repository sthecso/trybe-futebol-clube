import Club from '../database/models/Club';

const clubsService = {
  getAll: async () => {
    const clubs = await Club.findAll();

    return clubs;
  },
};

export default clubsService;

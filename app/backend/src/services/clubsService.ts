import Club from '../database/models/Club';

const clubsService = {
  getAll: async () => {
    const clubs = await Club.findAll();

    return clubs;
  },
  getById: async (id: string) => {
    const club = await Club.findByPk(id);

    return club;
  },
};

export default clubsService;

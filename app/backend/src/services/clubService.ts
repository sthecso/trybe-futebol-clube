import Club from '../database/models/Club';

const getAll = async () => {
  const clubs = await Club.findAll();

  return clubs;
};

const getById = async (id: string) => {
  const club = await Club.findByPk(id);

  return club;
};

export {
  getAll,
  getById,
};

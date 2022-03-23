import Club from '../database/models/Club';

const getClub = async () => {
  const result = await Club.findAll();

  return result;
};

const getClubId = async (id: string) => {
  const result = await Club.findByPk(id);

  return result;
};

export { getClub, getClubId };

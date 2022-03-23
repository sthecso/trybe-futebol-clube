import clubModel from '../database/models/Club';

const findOneClub = async (id: number) => {
  const club = await clubModel.findOne({ where: { id } });

  return club;
};

const findAllClubs = async () => {
  const clubs = await clubModel.findAll();

  return clubs;
};

export default findAllClubs;
export { findOneClub };

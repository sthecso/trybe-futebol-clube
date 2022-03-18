import Club from '../modelsSequelize/club';

const getAll = async () => {
  const clubs = await Club.findAll();
  return clubs;
};

const findClub = async (nameClub: string) => {
  const club = await Club.findOne({ where: { club_name: nameClub } });
  return club;
};

export default { getAll, findClub };

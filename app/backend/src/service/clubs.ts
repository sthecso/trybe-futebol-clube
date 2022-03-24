import Clubs from '../database/models/ClubModel';

interface IClub {
  id: number,
  clubName: string,
}

const findAllClubs = async () => {
  const allClubs = await Clubs.findAll();

  return allClubs;
};

const findClubById = async (searchId: number) => {
  const foundClub = await Clubs.findOne({ where: { id: searchId } }) as IClub;

  return foundClub;
};

export {
  findAllClubs,
  findClubById,
  IClub,
};

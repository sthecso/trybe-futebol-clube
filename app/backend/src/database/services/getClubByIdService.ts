import Clubs from '../models/Clubs';

async function getClubByIdService(id: string | number) {
  const club = await Clubs.findByPk(id);
  return club;
}

export default getClubByIdService;

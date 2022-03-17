import Clubs from '../models/Clubs';

async function getClubsService() {
  const clubs = await Clubs.findAll();
  return clubs;
}

export default getClubsService;

import Matchs from '../models/Matchs';

async function getMatchsService() {
  const matchs = await Matchs.findAll();

  return matchs;
}

export default getMatchsService;

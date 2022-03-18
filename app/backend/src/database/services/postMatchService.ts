import { MatchData } from '../../utils/Interfaces';
import Matchs from '../models/Matchs';

async function postMatchService(matchData: MatchData) {
  const createdMatch = await Matchs.create(matchData);

  return { code: 201, payload: createdMatch };
}

export default postMatchService;

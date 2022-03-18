import { UserSentMatchData, MatchData } from '../../utils/Interfaces';
import Matchs from '../models/Matchs';

async function postMatchService(matchData: UserSentMatchData) {
  const createdMatch = await Matchs.create(matchData) as MatchData;

  return { code: 201, payload: createdMatch };
}

export default postMatchService;

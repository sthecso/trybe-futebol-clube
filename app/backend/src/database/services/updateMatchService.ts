import { UserSentNewScores } from '../../utils/Interfaces';
import Matchs from '../models/Matchs';

async function updateMatchService(id: string, newScores: UserSentNewScores) {
  await Matchs.update(newScores, { where: { id, inProgress: true } });
  return { code: 200, payload: { message: 'Match updated with success' } };
}

export default updateMatchService;

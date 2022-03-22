import { UserSentNewScores } from '../../../helpers/Interfaces';
import Matchs from '../../models/Matchs';

const MESSAGE_MATCH_UPDATED = { message: 'Match updated with success' };

async function updateMatchService(id: string, newScores: UserSentNewScores) {
  await Matchs.update(newScores, { where: { id, inProgress: true } });
  return { code: 200, payload: MESSAGE_MATCH_UPDATED };
}

export default updateMatchService;

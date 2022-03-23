import {
  IMatch,
  INewMatch,
  IScore,
} from '../utils/interfaces';
import { MatchRepository, ClubRepository } from '../utils/repository';

export default class MatchService {
  static async getAll(inProgress: boolean | undefined = undefined) {
    let matches: IMatch[];

    if (inProgress) {
      matches = await MatchRepository.getAll();
    } else {
      matches = inProgress
        ? await MatchRepository.getAllInProgress()
        : await MatchRepository.getAllFinished();
    }

    return { code: 200, data: matches };
  }

  static async getById(id: string) {
    const match = await MatchRepository.getById(id);

    return match
      ? { code: 200, data: match }
      : { code: 404, data: { message: 'Match not found' } };
  }

  static async addMatch(data: INewMatch) {
    const matchTeams = await Promise.all([
      ClubRepository.getById(data.homeTeam.toString()),
      ClubRepository.getById(data.awayTeam.toString()),
    ]);

    if (matchTeams.includes(undefined)) {
      return { code: 401, data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await MatchRepository.addMatch(data);

    return { code: 201, data: newMatch };
  }

  static async finishMatch(id: string) {
    const status = await MatchRepository.finishMatch(id);

    return status
      ? { code: 200, data: { message: 'Finished match' } }
      : {
        code: 422,
        data: { message: 'Match already over or does not exist' },
      };
  }

  static async updateMatchScore(id: string, newScore: IScore) {
    const status = await MatchRepository.updateMatchScore(id, newScore);

    return status
      ? { code: 200, data: { message: 'Match score updated' } }
      : {
        code: 422,
        data: { message: 'Match already over or does not exist' },
      };
  }
}

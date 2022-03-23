import { MatchService } from '../../service';
import { INewMatch, IScore } from '../../utils/interfaces';

export default class MatchController {
  static async getAll(inProgress: boolean | undefined = undefined) {
    return MatchService.getAll(inProgress);
  }

  static async getById(id: string) {
    return MatchService.getById(id);
  }

  static async addMatch(data: INewMatch) {
    return MatchService.addMatch(data);
  }

  static async finishMatch(id: string) {
    return MatchService.finishMatch(id);
  }

  static async updateMatchScore(id: string, newScore: IScore) {
    return MatchService.updateMatchScore(id, newScore);
  }
}

import { MatchService } from '../../service';
import { INewMatch, IScore } from '../../utils/interfaces';

export default class MatchController {
  constructor(
    private matchService: MatchService,
  ) {}

  async getAll(inProgress: boolean | undefined = undefined) {
    return this.matchService.getAll(inProgress);
  }

  async getById(id: string) {
    return this.matchService.getById(id);
  }

  async addMatch(data: INewMatch) {
    return this.matchService.addMatch(data);
  }

  async finishMatch(id: string) {
    return this.matchService.finishMatch(id);
  }

  async updateMatchScore(id: string, newScore: IScore) {
    return this.matchService.updateMatchScore(id, newScore);
  }
}

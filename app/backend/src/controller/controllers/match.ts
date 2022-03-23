import { MatchService } from '../../service';
import { INewMatch, IScore } from '../../utils/interfaces';

export default class MatchController {
  private _matchService: MatchService;

  constructor() {
    this._matchService = new MatchService();
  }

  async getAll(inProgress: boolean | undefined = undefined) {
    return this._matchService.getAll(inProgress);
  }

  async getById(id: string) {
    return this._matchService.getById(id);
  }

  async addMatch(data: INewMatch) {
    return this._matchService.addMatch(data);
  }

  async finishMatch(id: string) {
    return this._matchService.finishMatch(id);
  }

  async updateMatchScore(id: string, newScore: IScore) {
    return this._matchService.updateMatchScore(id, newScore);
  }
}

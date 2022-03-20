import { MatchService } from '../services';

export default class MatchController {
  constructor(
    private matchService: MatchService,
  ) {}

  public async get(inProgress: boolean | undefined) {
    const result = await this.matchService.getAll(inProgress);

    return result;
  }
}

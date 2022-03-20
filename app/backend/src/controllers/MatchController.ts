import { IMatch } from '../interfaces/IMatchDTO';
import { MatchService } from '../services';

export default class MatchController {
  constructor(
    private matchService: MatchService,
  ) {}

  public async get(inProgress: boolean | undefined) {
    const result = await this.matchService.getAll(inProgress);

    return result;
  }

  public async add(match: IMatch) {
    const result = await this.matchService.add(match);

    return result;
  }

  public async finish(id: string) {
    const result = await this.matchService.finish(id);

    return result;
  }
}

import { createError } from '../utils';
import { IMatch, Score } from '../interfaces/IMatchDTO';
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
    if (match.awayTeam === match.homeTeam) {
      throw createError(
        'unauthorized',
        'It is not possible to create a match with two equal teams',
      );
    }

    const result = await this.matchService.add(match);

    return result;
  }

  public async update(id: string, newScore: Score) {
    const result = await this.matchService.update(id, newScore);

    return result;
  }

  public async finish(id: string) {
    const result = await this.matchService.finish(id);

    return result;
  }
}

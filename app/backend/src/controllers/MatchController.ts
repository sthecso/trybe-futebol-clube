import { IMatchDTO } from '../interfaces/IMatchDTO';
import { MatchService } from '../services';

export default class MatchController {
  constructor(
    private matchService: MatchService,
  ) {}

  public async get(): Promise<IMatchDTO[]> {
    const result = await this.matchService.getAll();

    return result as IMatchDTO[];
  }
}

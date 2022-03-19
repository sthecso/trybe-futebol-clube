import { MatchRepository } from '../repositories';
import { IMatchComplete } from '../utils/interfaces';

class MatchService {
  public static async findAll(inProgress: boolean) {
    const matches: IMatchComplete[] = await MatchRepository
      .findAll(inProgress);

    return matches;
  }
}

export default MatchService;

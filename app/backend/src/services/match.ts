import { MatchRepository } from '../repositories';
import { IMatchComplete } from '../utils/interfaces';

class MatchService {
  public static async findAll(): Promise<IMatchComplete[]> {
    const matches: IMatchComplete[] = await MatchRepository.findAll();

    return matches;
  }
}

export default MatchService;

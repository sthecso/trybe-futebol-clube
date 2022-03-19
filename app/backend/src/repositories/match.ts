import Match from '../database/models/Match';
import Club from '../database/models/Club';
import { IMatchComplete } from '../utils/interfaces';

class MatchRepository {
  public static async findAll(): Promise<IMatchComplete[]> {
    const result = await Match.findAll({
      include: [
        {
          model: Club,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        {
          model: Club,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ],
    });

    return result as unknown as IMatchComplete[];
  }
}

export default MatchRepository;

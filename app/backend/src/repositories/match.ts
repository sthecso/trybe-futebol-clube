import Match from '../database/models/Match';
import Club from '../database/models/Club';
import { IMatchComplete } from '../utils/interfaces';

class MatchRepository {
  public static async findAll(inProgress: boolean) {
    const baseOptions = {
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    };

    const options = inProgress ? (
      {
        ...baseOptions,
        where: { inProgress },
      }
    ) : baseOptions;

    const result = await Match.findAll(options);

    return result as unknown as IMatchComplete[];
  }
}

export default MatchRepository;

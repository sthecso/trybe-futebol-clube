import Match from '../database/models/Match';
import Club from '../database/models/Club';
import {
  IMatchSimple,
  IMatch,
  IMatchComplete,
} from '../utils/interfaces';

class MatchRepository {
  public static async findAll(inProgress: IMatch['inProgress']) {
    const baseOptions = {
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    };

    const options = inProgress ? ({
      ...baseOptions,
      where: { inProgress },
    }) : baseOptions;

    const result = await Match.findAll(options);

    return result as unknown as IMatchComplete[];
  }

  public static async findById(id: IMatch['id']) {
    const result = await Match.findByPk(id, {
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return result as unknown as IMatchComplete;
  }

  public static async create(newMatch: IMatchSimple) {
    const result = await Match.create(newMatch);

    return result;
  }
}

export default MatchRepository;

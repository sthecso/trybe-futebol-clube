import IMatchs from '../interfaces/IMatchs';
import Clubs from '../database/models/Club';
import Matchs from '../database/models/Match';

class MatchService {
  static async getMatchs(inProgress?: string) {
    const matchs = await Matchs.findAll({
      include: [
        { model: Clubs,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        { model: Clubs,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ],
    }) as unknown as IMatchs[];

    if (inProgress) {
      return matchs.filter((match) => String(match.inProgress) === inProgress);
    }

    return matchs;
  }
}

export default MatchService;

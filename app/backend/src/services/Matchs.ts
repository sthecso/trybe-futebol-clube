import Clubs from '../database/models/Club';
import Matchs from '../database/models/Match';

class MatchService {
  static async getMatchs() {
    const matchs = await Matchs.findAll({
      include: [
        { model: Clubs,
          as: 'homeClub',
          attributes: { exclude: ['id'] } },

        { model: Clubs,
          as: 'awayClub',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return { code: 200, data: matchs };
  }
}

export default MatchService;

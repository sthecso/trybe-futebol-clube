import IMatch from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Club from '../database/models/Club';

class MatchService {
  private MatchModel = Match;

  async getAll() {
    const matches = await this.MatchModel.findAll({
      include: [
        {
          model: Club,
          as: 'homeClub',
          attributes: { exclude: ['id'] },
        },
        {
          model: Club,
          as: 'awayClub',
          attributes: { exclude: ['id'] },
        },
      ],
    }) as unknown as IMatch[];
    return matches;
  }
}

export default MatchService;

import IMatch from '../interfaces/IMatch';
import Match from '../database/models/Match';
import Club from '../database/models/Club';

class MatchService {
  private MatchModel = Match;

  async getAll(inProgress: undefined | string) {
    const findOptions = { include: [
      { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
    ] };

    if (inProgress === 'true' || inProgress === 'false') {
      const boolInPogress = (inProgress === 'true');

      const matches = (await this.MatchModel.findAll(
        { where: { inProgress: boolInPogress }, ...findOptions },
      )) as unknown as IMatch[];
      return matches;
    }

    const matches = (await this.MatchModel.findAll(findOptions)) as unknown as IMatch[];
    return matches;
  }
}

export default MatchService;

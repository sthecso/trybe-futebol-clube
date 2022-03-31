import { ParsedQs } from 'qs';
import Clubs from '../database/models/Clubs';
import Matchs from '../database/models/Matchs';
// import { IMatchs } from '../interfaces/IMatchs';

class MatchsService {
  private _MatchsModel = Matchs;

  public getAll = async () => {
    const matchs = await this._MatchsModel.findAll({
      include: [{
        model: Clubs,
        as: 'homeClub',
        all: true,
        attributes: ['clubName'],
      }],
    });
    return matchs;
  };

  public getByProgress = async (
    inProgress: string | ParsedQs | string[] | ParsedQs[] | undefined,
  ) => {
    const query = await JSON.parse(await JSON.parse(await JSON.stringify(inProgress)));
    const match = await this._MatchsModel.findAll({
      where: {
        inProgress: query,
      },
      include: [{
        model: Clubs,
        as: 'homeClub',
        all: true,
        attributes: ['clubName'],
      }],
    });
    return match;
  };
}

export default new MatchsService();

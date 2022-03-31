import Matchs from '../database/models/Matchs';
// import { IMatchs } from '../interfaces/IMatchs';

class MatchsService {
  private _MatchsModel = Matchs;

  public getAll = async () => {
    const matchs = await this._MatchsModel.findAll();
    return matchs;
  };
}

export default new MatchsService();

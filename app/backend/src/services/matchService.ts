import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { IMatchDTO } from '../interfaces/IMatchDTO';

export default class MatchService {
  private matchModel = Match;

  private clubModel = Club;

  public async getAll(): Promise<IMatchDTO[]> {
    const result = await this.matchModel.findAll({
      include: [
        { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return result as unknown as IMatchDTO[];
  }
}

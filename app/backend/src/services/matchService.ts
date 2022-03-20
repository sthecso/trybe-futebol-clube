import { IMatch } from '../interfaces/IMatchDTO';
import Club from '../database/models/Club';
import Match from '../database/models/Match';

export default class MatchService {
  private matchModel = Match;

  private clubModel = Club;

  public async getAll(inProgress: boolean | undefined): Promise<Match[]> {
    if (inProgress === undefined) {
      const result = await this.matchModel.findAll({
        include: [
          { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
          { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      });

      return result;
    }
    const resultWithProgress = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return resultWithProgress;
  }

  public async add(match: IMatch): Promise<Match> {
    const result = await this.matchModel.create(match);

    return result;
  }

  public async finish(id: string): Promise<string> {
    const [result] = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    if (result) return 'Match finished';

    return 'Match not found or already finished';
  }
}

import { IMatch, Score } from '../interfaces/IMatchDTO';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import { createError } from '../utils';

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

  public async add(match: IMatch) {
    const homeTeam = await this.clubModel.findOne({
      where: { id: match.homeTeam },
    });

    const awayTeam = await this.clubModel.findOne({
      where: { id: match.awayTeam },
    });

    if (!homeTeam || !awayTeam) {
      throw createError('unauthorized', 'There is no team with such id!');
    }

    const result = await this.matchModel.create(match);

    return result;
  }

  public async update(id: string, newScore: Score) {
    const [result] = await this.matchModel.update(
      newScore,
      { where: { id, inProgress: true } },
    );

    if (!result) {
      throw createError('unprocessableEntity', 'Match is not in progress!');
    }

    return 'Match updated';
  }

  public async finish(id: string): Promise<string> {
    const [result] = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    if (!result) {
      throw createError('unprocessableEntity', 'Match is not in progress!');
    }

    return 'Match finished';
  }
}

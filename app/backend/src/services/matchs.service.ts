import { Op } from 'sequelize';
import { INewMatch, IScore } from '../interfaces';
import { MatchModel, ClubModel } from '../database/models';

export default class MatchService {
  private matchModel: typeof MatchModel;

  private clubModel: typeof ClubModel;

  constructor() {
    this.matchModel = MatchModel;
    this.clubModel = ClubModel;
  }

  async findAll(inProgress: boolean | undefined = undefined) {
    let matchList: MatchModel[];

    if (inProgress === undefined) {
      matchList = await this.matchModel.findAll({
        include: [
          { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
          { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      });
    } else {
      matchList = await this.matchModel.findAll({
        where: { inProgress },
        include: [
          { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
          { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      });
    }

    return { code: 200, data: matchList };
  }

  async findById(id: string) {
    const match = await this.matchModel.findByPk(id, {
      include: [
        { model: this.clubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: this.clubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return match ? { code: 200, data: match } : { code: 404, data: { message: 'Match not found' } };
  }

  async saveMatchInProgress(data: INewMatch) {
    const teams = await this.clubModel.count({
      where: { id: { [Op.in]: [data.homeTeam, data.awayTeam] } },
    });

    if (teams < 2) return { code: 401, data: { message: 'There is no team with such id!' } };

    const newMatch = await this.matchModel.create(data);

    return { code: 201, data: newMatch };
  }

  async finishMatch(id: string) {
    const [success] = await this.matchModel.update({ inProgress: false }, { where: { id } });

    return success ? { code: 200, data: { message: 'Finished match' } }
      : { code: 422, data: { message: 'Match already over or does not exist' } };
  }

  async updateScore(id: string, newScore: IScore) {
    const [success] = await this.matchModel.update(newScore, { where: { id, inProgress: true } });

    return success ? { code: 200, data: { message: 'Match score updated' } }
      : { code: 422, data: { message: 'Match already over or does not exist' } };
  }
}

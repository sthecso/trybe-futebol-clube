import StatusCode from '../enums';
import { ClubModel, MatchModel } from '../database/models';
import { IMatch, IMatchGoals } from '../interfaces';

class MatchService {
  private matchModel: typeof MatchModel;

  constructor() {
    this.matchModel = MatchModel;
  }

  async getAll() {
    const matchs = await this.matchModel.findAll({
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return { code: StatusCode.OK, data: matchs };
  }

  async getInProgress(inProgress: boolean) {
    const matchs = await this.matchModel.findAll({
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
      where: { inProgress },
    });
    return { code: StatusCode.OK, data: matchs };
  }

  async postMatch(match: IMatch) {
    const { id } = await this.matchModel.create(match);
    const data = {
      id,
      ...match,
    };
    return { code: StatusCode.CREATED, data };
  }

  async editMatch(matchGoals: IMatchGoals) {
    const { id, homeTeamGoals, awayTeamGoals } = matchGoals;
    const [match] = await this.matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id, inProgress: true } },
    );
    if (!match) {
      return {
        code: StatusCode.UNPROCESSABLE_ENTITY, data: { message: 'Match is not in progress!' },
      };
    }
    return { code: StatusCode.OK, data: { message: 'Match edited' } };
  }

  async finishMatch(id: string) {
    const [match] = await this.matchModel.update(
      { inProgress: false },
      {
        where: { id },
      },
    );
    if (!match) {
      return {
        code: StatusCode.UNPROCESSABLE_ENTITY, data: { message: 'Match is not in progress!' },
      };
    }
    return { code: StatusCode.OK, data: { message: 'Match finished' } };
  }
}

export default MatchService;

import StatusCode from '../enums';
import { ClubModel, MatchModel } from '../database/models';

class MatchService {
  private matchModel: typeof MatchModel;

  constructor() {
    this.matchModel = MatchModel;
  }

  async getAll(inProgress: boolean) {
    let matchs;
    console.log(inProgress);
    if (inProgress) {
      matchs = await this.matchModel.findAll({ include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
      where: { inProgress } });
    } else {
      matchs = await this.matchModel.findAll({ include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ] });
    }
    return { code: StatusCode.OK, data: matchs };
  }
}

export default MatchService;

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
}

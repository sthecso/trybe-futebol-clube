import Club from '../../database/models/Club';

import { MatchRepository } from '../../database/repositories';

class GetAllMatchesModel {
  private matchRepository = new MatchRepository();

  private clubEntity = Club;

  async handle(inProgress: boolean | undefined = undefined) {
    let matches;

    if (inProgress === undefined) {
      matches = await this.matchRepository.findAll({
        include: [
          { model: this.clubEntity, as: 'homeClub' },
          { model: this.clubEntity, as: 'awayClub' },
        ],
      });
    } else {
      matches = await this.matchRepository.findAll({
        where: { inProgress },
        include: [
          { model: this.clubEntity, as: 'homeClub' },
          { model: this.clubEntity, as: 'awayClub' },
        ],
      });
    }

    return matches;
  }
}

export default GetAllMatchesModel;

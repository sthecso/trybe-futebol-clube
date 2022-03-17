import Match from '../../database/models/Matchs';

import Club from '../../database/models/Club';

class GetAllMatchesModel {
  private matchEntity = Match;

  private clubEntity = Club;

  async handle(inProgress: boolean | undefined = undefined) {
    let matches;

    if (inProgress === undefined) {
      matches = await this.matchEntity.findAll({
        include: [
          { model: this.clubEntity, as: 'homeClub' },
          { model: this.clubEntity, as: 'awayClub' },
        ],
      });
    } else {
      matches = await this.matchEntity.findAll({
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

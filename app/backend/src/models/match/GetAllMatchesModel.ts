import Match from '../../database/models/Matchs';

import Club from '../../database/models/Club';

class GetAllMatchesModel {
  private matchEntity = Match;

  private clubEntity = Club;

  async handle() {
    const allMatches = await this.matchEntity.findAll({
      include: [
        { model: this.clubEntity, as: 'homeClub' },
        { model: this.clubEntity, as: 'awayClub' },
      ],
    });

    return allMatches;
  }
}

export default GetAllMatchesModel;

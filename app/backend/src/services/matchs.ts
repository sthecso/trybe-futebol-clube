import Match from '../database/models/Match';
import Clubs from '../database/models/Club';

export default class MatchsService {
  constructor(
    private matchs = Match,
    private clubs = Clubs,
  ) {}

  async matchRequest() {
    const matchs = await this.matchs
      .findAll(
        {
          include: [
            { model: this.clubs, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubs, as: 'awayClub', attributes: ['clubName'] },
          ] },
      );
    console.log(matchs);
    return { matchs, code: 200 };
  }
}

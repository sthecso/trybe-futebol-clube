import Match from '../database/models/Match';
import Clubs from '../database/models/Club';

export default class MatchsService {
  constructor(
    private matchs = Match,
    private clubs = Clubs,
  ) {}

  // pense em como você pode unir os métodos abaixo (inProgressRequest e matchRequest);

  async inProgressRequest(inProgress: boolean) {
    const matchs = await this.matchs
      .findAll(
        {
          where: { inProgress },
          include: [
            { model: this.clubs, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubs, as: 'awayClub', attributes: ['clubName'] },
          ] },
      );
    return { matchs, code: 200 };
  }

  async matchRequest() {
    const matchs = await this.matchs
      .findAll(
        {
          include: [
            { model: this.clubs, as: 'homeClub', attributes: ['clubName'] },
            { model: this.clubs, as: 'awayClub', attributes: ['clubName'] },
          ] },
      );
    return { matchs, code: 200 };
  }
}

import Clubs from '../../database/models/Club';

export default class ClubsService {
  constructor(
    private clubs = Clubs,
  ) {}

  async clubsRequest() {
    const clubs = await this.clubs.findAll({});
    console.log(clubs);

    return { code: 200, clubs };
  }
}

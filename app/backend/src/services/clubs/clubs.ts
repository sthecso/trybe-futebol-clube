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

  async clubsRequestById(id: string) {
    const club = await this.clubs.findOne({
      where: { id },
      raw: true,
    });

    if (!club) return { message: '', code: 404 };

    return { code: 200, club };
  }
}
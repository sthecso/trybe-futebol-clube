import Club from '../database/models/Club';
import Match from '../database/models/Match';

export default class GetAllService {
  public static async getAll() {
    const match = await Match.findAll({
      include: [
        { model: Club,
          as: 'homeClub',
          through: {
            attributes: ['clubName'],
          } },
        { model: Club,
          as: 'awayClub',
          through: {
            attributes: ['clubName'],
          } },
      ],
    });
    return match;
  }
}

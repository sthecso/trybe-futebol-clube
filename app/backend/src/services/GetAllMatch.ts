import Club from '../database/models/Club';
import Match from '../database/models/Match';

export default class GetAllService {
  public static async getAll() {
    const match = await Match.findAll({
      include: [
        { model: Club,
          as: 'homeClub',
          attributes: ['clubName'],
        },
        { model: Club,
          as: 'awayClub',
          attributes: ['clubName'],
        },
      ],
    });
    return match;
  }
}

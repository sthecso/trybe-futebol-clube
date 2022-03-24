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
  public static async getAllTrue(){
    const match = await Match.findAll({
      where:{ inProgress: true},
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
  public static async getAllFalse(){
    const match = await Match.findAll({
      where:{ inProgress: false},
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


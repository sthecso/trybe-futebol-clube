import Club from '../database/models/club';
import Matchs from '../database/models/match';

export default class MatchsService {
  public static async getAll() {
    const findMatchs = await Matchs.findAll({ include: [
      {
        model: Club,
        as: 'homeClub',
        attributes: {
          exclude: ['id'],
        },
      },
      {
        model: Club,
        as: 'awayClub',
        attributes: {
          exclude: ['id'],
        },
      },
    ] });

    return findMatchs;
  }

  // public static async getById(id: string) {
  //   const club = await;

  //   return club;
  // }
}

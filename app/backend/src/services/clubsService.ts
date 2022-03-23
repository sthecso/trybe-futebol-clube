import Clubs from '../database/models/club';

export default class ClubsService {
  public static async getAll() {
    const findClubs = await Clubs.findAll();

    return findClubs;
  }
}

import Club from '../database/models/Club';

export default class ClubService {
  public static async getAllClubs() {
    const allClubs = Club.findAll();
    return allClubs;
  }

  public static async getClubById(id: number) {
    const getClub = Club.findByPk(id);
    return getClub;
  }
}

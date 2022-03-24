import Clubs from '../database/models/Club';

class ClubService {
  static async getClubs() {
    const clubs = await Clubs.findAll();
    return { code: 200, data: clubs };
  }

  static async getByIdClub(id: number) {
    const club = await Clubs.findOne({ where: { id } });
    return { code: 200, data: club };
  }
}

export default ClubService;

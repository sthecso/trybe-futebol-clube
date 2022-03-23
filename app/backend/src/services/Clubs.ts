import Clubs from '../database/models/Club';

class ClubService {
  static async getClubs() {
    const clubs = await Clubs.findAll();
    return { code: 200, data: clubs };
  }
}

export default ClubService;

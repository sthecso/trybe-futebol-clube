import Club from '../database/models/club';

class ClubService {
  static async findAll() {
    const allTeams = await Club.findAll();
    return allTeams;
  }

  static async findOneById(id: string) {
    const oneTeam = await Club.findOne({ where: { id } });
    return oneTeam;
  }
}

export default ClubService;

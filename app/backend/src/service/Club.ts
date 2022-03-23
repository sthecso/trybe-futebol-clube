import { Op } from 'sequelize';
import Club from '../database/models/club';

class ClubService {
  static async findAll() {
    const allTeams = await Club.findAll();
    return allTeams;
  }

  static async findAllIsTeam(params:number[]) {
    const allTeam = await Club.findAll({ where: { id: { [Op.in]: params } } });
    return allTeam;
  }

  static async findOneById(id: string) {
    const oneTeam = await Club.findOne({ where: { id } });
    return oneTeam;
  }
}

export default ClubService;

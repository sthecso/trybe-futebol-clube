import Match from '../database/models/matchs';
import Club from '../database/models/club';

class MatchService {
  static async findAll() {
    const allTeams = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ] });
    return allTeams;
  }

  static async findOneByInProgress(inProgress: string) {
    const oneTeam = await Match.findAll({ where: { in_progress: JSON.parse(inProgress) },
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ] });
    return oneTeam;
  }
}

export default MatchService;

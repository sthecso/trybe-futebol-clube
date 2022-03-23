import Match from '../database/models/matchs';
import Club from '../database/models/club';

interface UpdatePatch {
  id: number;
}

interface UpdatePatchTeam extends UpdatePatch {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

class MatchService {
  static async findAll() {
    const allMatch = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ] });
    return allMatch;
  }

  static async findOneByInProgress(inProgress: string) {
    const oneMatch = await Match.findAll({ where: { in_progress: JSON.parse(inProgress) },
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ] });
    return oneMatch;
  }

  static async create(matchCreated: object) {
    const resultQuery = await Match.create(matchCreated);
    return resultQuery;
  }

  static async updatePatch(params: UpdatePatch) {
    const { id } = params;

    const result = await Match.update({
      inProgress: false,
    }, { where: { id } });

    return result[0];
  }

  static async updatePatchTeamGoals(params: UpdatePatchTeam) {
    const { id, homeTeamGoals, awayTeamGoals } = params;

    const result = await Match.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });

    return result[0];
  }
}

export default MatchService;

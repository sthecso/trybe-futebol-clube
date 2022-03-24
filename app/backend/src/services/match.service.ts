import Club from "../database/models/Club";
import Match from "../database/models/Match";

export default class MatchsServices {
  async findOneByInProgress(inProgress: string) {
    const oneTeam = await Match.findAll({
      where: { in_progress: JSON.parse(inProgress) },
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ]
    });
    return oneTeam;
  }

  async allMatchs() {
    const allTeams = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub' },
        { model: Club, as: 'awayClub' },
      ]
    });
    return allTeams;
  }

  async create(data: object) {
    const result = await Match.create(data);
    return result;
  }

  async findById(id: number) {
    const result = await Match.findOne({
      where: { id },
    });
    return result;
  }

  async editMatch(id: number) {
    await Match.update(
      { inProgress: false },
      { where: { id } } ,
    );
    const findById = this.findById(id);
    return findById;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await Match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } } ,
    );
    const findById = this.findById(id);
    return findById;
  }
};

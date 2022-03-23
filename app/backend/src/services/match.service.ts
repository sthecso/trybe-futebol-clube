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
};

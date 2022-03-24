import Match from '../database/models/Match';
import GetByIdMatch from './MatchByIdService';

export default class PatchMatchService27 {
  public static async patch(id:number, homeTeamGoals:number, awayTeamGoals:number) {
    await Match.update(
      { inProgress: false, homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    const result = await GetByIdMatch.getById(id);
    return result;
  }
}

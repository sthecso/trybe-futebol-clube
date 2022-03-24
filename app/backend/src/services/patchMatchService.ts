import Match from '../database/models/Match';
import GetByIdMatch from './MatchByIdService';

export default class PatchMatchService {
  public static async patch(id:number) {
    await Match.update(
      { inProgress: false },
      { where: { id } },
    );
    const result = await GetByIdMatch.getById(id);
    return result;
  }
}

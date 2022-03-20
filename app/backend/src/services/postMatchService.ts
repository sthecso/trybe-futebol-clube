import Match from '../database/models/Club';
import { IMatch, MatchWithId } from '../interface/Match';
import GetById from './ClubById';

export default class PostMatch {
  public static async postMatch(data: IMatch) {
    const homeId = Number(data.homeTeam);
    const awayId = Number(data.awayTeam);
    const homeClubId = await GetById.getById(homeId);
    const awayClubId = await GetById.getById(awayId);
    if (!homeClubId || !awayClubId) {
      throw new Error('Id is invalid');
    }
    if (homeClubId === awayClubId) {
      throw new Error('It is not possible to create a match with two equal teams');
    }
    const match = await Match.create(data);
    return match as unknown as MatchWithId;
  }
}

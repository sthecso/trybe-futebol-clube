import Match from '../database/models/Match';
import { IMatch, MatchWithId } from '../interface/Match';
import GetById from './ClubById';

export default class PostMatch {
  public static async postMatch(data: IMatch) {
    const homeId = Number(data.homeTeam);
    const awayId = Number(data.awayTeam);
    const homeClubId = await GetById.getById(homeId);
    const awayClubId = await GetById.getById(awayId);
    if (!homeClubId || !awayClubId) {
      throw new Error('There is no team with such id!');
    }
    if (homeClubId.id === awayClubId.id) {
      console.log(homeClubId.id)
      throw new Error('It is not possible to create a match with two equal teams');
    }
    const match = await Match.create(data);
    console.log(match,'match')
    return match as unknown as MatchWithId;
  }
}

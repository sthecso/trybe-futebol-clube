import Match from '../database/models/Match';

export default class ClubService {
  public static async getAllMatches() {
    const allMatches = Match.findAll();
    return allMatches;
  }
}

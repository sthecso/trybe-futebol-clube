import Match from '../database/models/Match';

export default class GetByIdMatch {
  public static async getById(id:number) {
    const team = await Match.findByPk(id);
    return team;
  }
}

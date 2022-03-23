import Club from '../database/models/Club';

export default class GetById {
  public static async getById(id:number) {
    const team = await Club.findByPk(id);
    console.log(team)
    return team;
  }
}

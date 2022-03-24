import PatchMatchService27 from '../services/patchMatch27';

export default class PatchMatchController27 {
  public static async patch27(id:number, homeTeamGoals:number, awayTeamGoals:number) {
    const result = await PatchMatchService27.patch(id, homeTeamGoals, awayTeamGoals);
    return result;
  }
}

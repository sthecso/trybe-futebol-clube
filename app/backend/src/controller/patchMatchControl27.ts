import PatchMatchService27 from '../services/patchMatch27';

export default class PatchMatchController27 {
  public static async patch27Goal(id:number, homeTeamGoals:number, awayTeamGoals:number) {
    const result = await PatchMatchService27.patchGoals(id, homeTeamGoals, awayTeamGoals);
    return result;
  }

  public static async patchInProgres(id:number) {
    const result = await PatchMatchService27.patchInProgress(id);
    return result;
  }
}

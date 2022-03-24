import PatchMatchService from '../services/patchMatchService';

export default class PatchMatchController {
  public static async patch(id:number) {
    const result = await PatchMatchService.patch(id);
    return result;
  }
}

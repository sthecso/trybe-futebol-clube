import { GetAllMatchesModel } from '../../models/match';

class GetAllMatchesService {
  private getAllMatchesModel = new GetAllMatchesModel();

  async handle(inProgress: string | undefined) {
    let booleanInProgress: boolean | undefined;

    if (inProgress && inProgress.toString().match(/^(false)$/i)) {
      booleanInProgress = false;
    }

    if (inProgress && inProgress.toString().match(/^(true)$/i)) {
      booleanInProgress = true;
    }

    const allMatches = await this.getAllMatchesModel.handle(booleanInProgress);

    return allMatches;
  }
}

export default GetAllMatchesService;

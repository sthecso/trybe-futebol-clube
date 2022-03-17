import { GetAllMatchesModel } from '../../models/match';

class GetAllMatchesService {
  private getAllMatchesModel = new GetAllMatchesModel();

  async handle() {
    const allMatches = await this.getAllMatchesModel.handle();

    return allMatches;
  }
}

export default GetAllMatchesService;

import { HttpStatusCode } from '../../utils';

import { GetAllMatchesService } from '../../services/match';

class GetAllMatchesController {
  private getAllMatchesService = new GetAllMatchesService();

  private httpStatusCode = HttpStatusCode;

  async handle(inProgress: string) {
    const allMatches = await this.getAllMatchesService.handle(inProgress);

    return {
      httpStatusCode: this.httpStatusCode.Ok,
      result: allMatches,
    };
  }
}

export default GetAllMatchesController;

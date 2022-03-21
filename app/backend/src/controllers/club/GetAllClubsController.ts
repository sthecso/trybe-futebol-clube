import { HttpStatusCode } from '../../utils';

import { GetAllClubsService } from '../../services/club';

class GetAllClubsController {
  private getAllClubsService = new GetAllClubsService();

  private httpStatusCode = HttpStatusCode;

  async handle() {
    const allClubs = await this.getAllClubsService.handle();

    return { httpStatusCode: this.httpStatusCode.Ok, result: allClubs };
  }
}

export default GetAllClubsController;

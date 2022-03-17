import { NextFunction, Request, Response } from 'express';

import { HttpStatusCode } from '../../utils';

import { GetAllClubsService } from '../../services/club';

class GetAllClubsController {
  private getAllClubsService = new GetAllClubsService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const allClubs = await this.getAllClubsService.handle();

    return res
      .status(this.httpStatusCode.Ok)
      .json(allClubs);
  }
}

export default GetAllClubsController;

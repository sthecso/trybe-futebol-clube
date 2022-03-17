import { NextFunction, Request, Response } from 'express';

import { HttpStatusCode } from '../../utils';

import { GetAllMatchesService } from '../../services/match';

class GetAllMatchesController {
  private getAllMatchesService = new GetAllMatchesService();

  private httpStatusCode = HttpStatusCode;

  constructor () {
    this.handle = this.handle.bind(this);
  }

  async handle(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const allMatches = await this.getAllMatchesService.handle();

    return res
      .status(this.httpStatusCode.Ok)
      .json(allMatches);
  }
}

export default GetAllMatchesController;

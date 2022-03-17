import { NextFunction, Request, Response } from 'express';

import { HttpStatusCode } from '../../utils';

import { GetAllMatchesService } from '../../services/match';

import { IExpressQuery } from '../../interfaces';

class GetAllMatchesController {
  private getAllMatchesService = new GetAllMatchesService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const { inProgress } = req.query as unknown as IExpressQuery;

    const allMatches = await this.getAllMatchesService.handle(inProgress);

    return res
      .status(this.httpStatusCode.Ok)
      .json(allMatches);
  }
}

export default GetAllMatchesController;

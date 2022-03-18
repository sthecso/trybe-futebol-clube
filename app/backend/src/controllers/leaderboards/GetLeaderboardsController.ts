import { NextFunction, Request, Response } from 'express';

import { GetLeaderboardsService } from '../../services/leaderboards';

import { HttpStatusCode } from '../../utils';

class GetLeaderboardsController {
  private getLeaderboardsService = new GetLeaderboardsService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const leaderboards = await this.getLeaderboardsService.handle();

    return res
      .status(this.httpStatusCode.Ok)
      .json(leaderboards);
  }
}

export default GetLeaderboardsController;

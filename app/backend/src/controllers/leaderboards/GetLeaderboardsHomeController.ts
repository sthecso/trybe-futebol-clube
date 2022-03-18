import { NextFunction, Request, Response } from 'express';

import { GetLeaderboardsHomeService } from '../../services/leaderboards';

import { HttpStatusCode } from '../../utils';

class GetLeaderboardsHomeController {
  private getLeaderboardsHomeService = new GetLeaderboardsHomeService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const leaderboards = await this.getLeaderboardsHomeService.handle();

    return res
      .status(this.httpStatusCode.Ok)
      .json(leaderboards);
  }
}

export default GetLeaderboardsHomeController;

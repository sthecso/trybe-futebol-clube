import { NextFunction, Request, Response } from 'express';

import { GetLeaderboardsAwayService } from '../../services/leaderboards';

import { HttpStatusCode } from '../../utils';

class GetLeaderboardsAwayController {
  private getLeaderboardsAwayService = new GetLeaderboardsAwayService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    _req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ) {
    const leaderboards = await this.getLeaderboardsAwayService.handle();

    return res
      .status(this.httpStatusCode.Ok)
      .json(leaderboards);
  }
}

export default GetLeaderboardsAwayController;

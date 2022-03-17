import { NextFunction, Request, Response } from 'express';

import { CreateMatchService } from '../../services/match';

import { IErrorMessage } from '../../interfaces';

import { IMatchResponse, IMatchRequest } from '../../interfaces/match';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class CreateMatchController {
  private createMatchService = new CreateMatchService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Promise<Response<IErrorMessage | IMatchResponse>> {
    const matchData = req.body as IMatchRequest;

    const createdMatch = await this.createMatchService.handle(matchData);

    if (createdMatch instanceof ErrorCatcher) {
      return res
        .status(createdMatch.httpStatusCode)
        .json({ message: createdMatch.message });
    }

    return res
      .status(this.httpStatusCode.Created)
      .json(createdMatch);
  }
}

export default CreateMatchController;

import { NextFunction, Request, Response } from 'express';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { IErrorMessage } from '../../interfaces';

import { FinishMatchService } from '../../services/match';

class FinishMatchController {
  private finishMatchService = new FinishMatchService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Promise<Response<IErrorMessage | void>> {
    const { id } = req.params;

    const error = await this.finishMatchService.handle(id);

    if (error instanceof ErrorCatcher) {
      return res
        .status(error.httpStatusCode)
        .json({ message: error.message });
    }

    return res
      .status(this.httpStatusCode.Ok)
      .send();
  }
}

export default FinishMatchController;

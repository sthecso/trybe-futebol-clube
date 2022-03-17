import { NextFunction, Request, Response } from 'express';

import { IErrorMessage } from '../../interfaces';

import { HttpStatusCode } from '../../utils';

class ValidateInProgressBodyRequest {
  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    nextMiddleware: NextFunction,
  ): Promise<Response<IErrorMessage> | void> {
    const { inProgress } = req.body;

    if (typeof inProgress === 'boolean') {
      return nextMiddleware();
    }

    return res
      .status(this.httpStatusCode.BadRequest)
      .json({ message: '\'inProgress\' must be \'true\' or \'false\'' });
  }
}

export default ValidateInProgressBodyRequest;

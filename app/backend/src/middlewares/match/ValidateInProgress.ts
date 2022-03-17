import { NextFunction, Request, Response } from 'express';

import { IErrorMessage } from '../../interfaces';

import { HttpStatusCode } from '../../utils';

class ValidateInProgress {
  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    nextMiddleware: NextFunction,
  ): Promise<Response<IErrorMessage> | void> {
    const { inProgress } = req.query;

    if (!inProgress || !inProgress.length) {
      return nextMiddleware();
    }

    // This regex allows any letter to be uppercase and lowercase
    // created by: me :)
    if (!inProgress.toString().match(/^(true|false)$/i)) {
      return res
        .status(this.httpStatusCode.BadRequest)
        .json({ message: '\'inProgress\' must have \'true\' or \'false\'' });
    }

    return nextMiddleware();
  }
}

export default ValidateInProgress;

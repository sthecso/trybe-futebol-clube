import { NextFunction, Request, Response } from 'express';

import { IErrorMessage } from '../../interfaces';

import { HttpStatusCode } from '../../utils';

class ValidateTokenController {
  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Response<string | IErrorMessage> {
    const { userDataDecoded: jwtDecoded } = req;

    return res.status(this.httpStatusCode.Ok).json(jwtDecoded.role);
  }
}

export default ValidateTokenController;

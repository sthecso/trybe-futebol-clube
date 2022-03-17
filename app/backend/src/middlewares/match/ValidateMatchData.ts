import { NextFunction, Request, Response } from 'express';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { IErrorMessage } from '../../interfaces';

class ValidateMatchData {
  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  verifyIsNumber(
    data: string | object | undefined | null | number | boolean,
    field: string,
  ): ErrorCatcher | string | object | undefined | null | number | boolean {
    if (Number.isNaN(Number(data))) {
      return new this.ErrorCatcher(
        this.httpStatusCode.BadRequest,
        `'${field}' must be a number`,
      );
    }

    return data;
  }

  async handle(
    req: Request,
    res: Response,
    nextMiddleware: NextFunction,
  ): Promise<Response<IErrorMessage> | void> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    const objectToValidate = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };

    let error = {};

    Object.entries(objectToValidate).forEach((entries) => {
      const verify = this.verifyIsNumber(entries[1], entries[0]);
      if (verify instanceof ErrorCatcher) {
        error = verify;
      }
    });

    if (error instanceof ErrorCatcher) {
      return res.status(error.httpStatusCode).json({ message: error.message });
    }

    nextMiddleware();
  }
}

export default ValidateMatchData;

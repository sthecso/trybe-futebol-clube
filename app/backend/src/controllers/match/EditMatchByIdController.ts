import { NextFunction, Request, Response } from 'express';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { IErrorMessage } from '../../interfaces';

import { IMatchResponse } from '../../interfaces/match';

import { EditMatchByIdService } from '../../services/match';

class EditMatchByIdController {
  private editMatchByIdService = new EditMatchByIdService();

  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Promise<Response<IErrorMessage | IMatchResponse>> {
    const { id } = req.params;
    const matchData = req.body;

    const editedMatch = await this.editMatchByIdService.handle(matchData, id);

    if (editedMatch instanceof ErrorCatcher) {
      return res
        .status(editedMatch.httpStatusCode)
        .json({ message: editedMatch.message });
    }

    return res
      .status(this.httpStatusCode.Ok)
      .json(editedMatch);
  }
}

export default EditMatchByIdController;
